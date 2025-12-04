# SSL/HTTPS Setup Guide for JMD Supply Chain Solutions

## Prerequisites

Before setting up SSL, ensure:

1. ✅ Your domain is registered
2. ✅ DNS A records point to your EC2 IP:
   - `@` or root domain → EC2 IP
   - `www` → EC2 IP
3. ✅ EC2 Security Group allows:
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
4. ✅ Domain is accessible via HTTP (test: `http://your-domain.com`)

---

## Setup Instructions

### Step 1: Configure DNS (Do this FIRST)

Go to your domain registrar and add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_EC2_PUBLIC_IP | 3600 |
| A | www | YOUR_EC2_PUBLIC_IP | 3600 |

**Wait 5-10 minutes** for DNS to propagate. Test with:
```bash
ping your-domain.com
```

### Step 2: Push Updated Files to GitHub

On your local machine:

```bash
# Add new files
git add docker-compose.yml nginx-ssl.conf setup-ssl.sh SSL-SETUP-GUIDE.md

# Commit changes
git commit -m "Add SSL/HTTPS support"

# Push to repository
git push origin main
```

### Step 3: Pull Changes on EC2

SSH into your EC2 instance:

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Navigate to project
cd ~/jmd_supply

# Pull latest changes
git pull origin main

# Make script executable
chmod +x setup-ssl.sh
```

### Step 4: Run SSL Setup Script

```bash
./setup-ssl.sh
```

The script will:
1. Ask for your domain name
2. Ask for your email address
3. Update nginx configuration
4. Start containers in HTTP mode
5. Obtain SSL certificate from Let's Encrypt
6. Restart containers with SSL enabled

**Example:**
```
Enter your domain (e.g., example.com): jmdsolutions.com
Enter your email address: admin@jmdsolutions.com
```

### Step 5: Verify SSL

Open your browser and visit:
- `https://your-domain.com`
- `https://www.your-domain.com`

You should see:
- 🔒 Padlock icon in the address bar
- Valid SSL certificate
- Automatic redirect from HTTP to HTTPS

---

## Troubleshooting

### Issue: "Failed to obtain SSL certificate"

**Check DNS:**
```bash
# Test if domain resolves to your EC2 IP
dig your-domain.com
nslookup your-domain.com
```

**Check HTTP access:**
```bash
curl http://your-domain.com
```

**Check ports:**
```bash
sudo netstat -tlnp | grep -E ':(80|443)'
```

### Issue: "Connection refused"

Make sure security group allows:
- Port 80 (HTTP)
- Port 443 (HTTPS)

### Issue: DNS not propagating

Wait 15-30 minutes after DNS changes. Check propagation:
```bash
https://dnschecker.org
```

### Issue: Container won't start

Check logs:
```bash
docker logs jmd-supply-chain
docker logs certbot
```

### Issue: Certificate renewal fails

Manually renew:
```bash
docker run --rm \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/www/certbot:/var/www/certbot \
  certbot/certbot renew
```

---

## Manual SSL Setup (Alternative)

If the script doesn't work, you can set up SSL manually:

### 1. Stop containers
```bash
docker-compose down
```

### 2. Update nginx-ssl.conf
```bash
nano nginx-ssl.conf
# Replace "your-domain.com" with your actual domain
```

### 3. Get certificate
```bash
sudo certbot certonly --standalone \
  -d your-domain.com \
  -d www.your-domain.com \
  --email your-email@example.com \
  --agree-tos
```

### 4. Start containers
```bash
docker-compose up -d --build
```

---

## Certificate Renewal

Certificates auto-renew via the certbot container every 12 hours.

**Check renewal status:**
```bash
docker logs certbot
```

**Manual renewal:**
```bash
docker exec certbot certbot renew
docker-compose restart
```

---

## Security Best Practices

✅ **Implemented:**
- TLS 1.2 and 1.3 only
- Strong cipher suites
- HSTS headers
- XSS protection
- Clickjacking protection
- HTTP to HTTPS redirect

✅ **Additional (Optional):**

**1. Enable firewall:**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

**2. Set up monitoring:**
- CloudWatch for server metrics
- SSL certificate expiry alerts

**3. Regular updates:**
```bash
sudo apt update && sudo apt upgrade -y
```

---

## Testing SSL Configuration

**Online tools:**
- https://www.ssllabs.com/ssltest/
- https://observatory.mozilla.org/

**Expected grade:** A or A+

---

## Need Help?

If you encounter issues:

1. Check logs: `docker logs jmd-supply-chain`
2. Verify DNS: `dig your-domain.com`
3. Test HTTP: `curl -I http://your-domain.com`
4. Check security groups in AWS Console
5. Ensure domain propagation is complete

---

## Certificate Details

- **Issuer:** Let's Encrypt
- **Validity:** 90 days
- **Auto-renewal:** Every 12 hours (certbot container)
- **Cost:** FREE 🎉
