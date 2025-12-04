# JMD Supply Chain Solutions - AWS EC2 Deployment Guide

## Prerequisites on EC2 Instance

Your EC2 instance should have:
- Ubuntu 20.04 or later
- Security Group allowing HTTP (port 80) and SSH (port 22)
- At least 1GB RAM (t2.micro works)

---

## Step 1: Connect to EC2 Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

---

## Step 2: Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version

# Log out and back in for group changes to take effect
exit
```

---

## Step 3: Connect Again and Setup Git

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Install git if not present
sudo apt install git -y

# Clone your repository
git clone https://github.com/your-username/jmdSolutions.git
cd jmdSolutions
```

---

## Step 4: Deploy the Application

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

**Alternative manual deployment:**
```bash
# Build and run containers
docker-compose up -d --build

# Check status
docker ps

# View logs
docker logs jmd-supply-chain
```

---

## Step 5: Verify Deployment

Open your browser and visit:
```
http://your-ec2-public-ip
```

---

## Useful Commands

### View logs
```bash
docker logs jmd-supply-chain
docker logs -f jmd-supply-chain  # Follow logs
```

### Restart containers
```bash
docker-compose restart
```

### Stop containers
```bash
docker-compose down
```

### Update deployment (after git pull)
```bash
git pull origin main
./deploy.sh
```

### Check container status
```bash
docker ps
docker stats
```

### Remove all containers and images
```bash
docker-compose down
docker system prune -a
```

---

## Setting Up Custom Domain (Optional)

### 1. Point your domain to EC2 IP
- Go to your domain registrar
- Add an A record pointing to your EC2 public IP

### 2. Install Certbot for HTTPS
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Stop docker containers temporarily
docker-compose down

# Install Nginx on host
sudo apt install nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Update nginx.conf in your project with your domain
# Rebuild containers
docker-compose up -d --build
```

---

## Troubleshooting

### Port 80 already in use
```bash
# Check what's using port 80
sudo lsof -i :80

# Stop nginx if running on host
sudo systemctl stop nginx
sudo systemctl disable nginx
```

### Container not starting
```bash
# Check logs
docker logs jmd-supply-chain

# Check if build succeeded
docker images
```

### Changes not reflecting
```bash
# Force rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

---

## Monitoring

### Enable CloudWatch monitoring (Optional)
```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```

---

## Security Recommendations

1. **Update security groups**: Only allow necessary ports
2. **Enable HTTPS**: Use Certbot for free SSL
3. **Regular updates**: 
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
4. **Firewall**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

---

## Auto-deployment with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` in your repository for automatic deployment on push.

---

## Support

If you encounter issues:
1. Check Docker logs: `docker logs jmd-supply-chain`
2. Check nginx logs: `docker exec jmd-supply-chain cat /var/log/nginx/error.log`
3. Verify EC2 security groups allow HTTP traffic
4. Ensure EC2 instance has enough memory (at least 1GB)
