#!/bin/bash

echo "🔒 SSL Certificate Setup for JMD Supply Chain Solutions"
echo "========================================================"
echo ""

# Prompt for domain and email
read -p "Enter your domain (e.g., example.com): " DOMAIN
read -p "Enter your email address: " EMAIL

echo ""
echo "📝 Configuration:"
echo "   Domain: $DOMAIN"
echo "   WWW: www.$DOMAIN"
echo "   Email: $EMAIL"
echo ""

read -p "Is this correct? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "❌ Setup cancelled"
    exit 1
fi

echo ""
echo "🔧 Step 1: Updating nginx configuration with your domain..."

# Update nginx-ssl.conf with actual domain
sed -i "s/your-domain.com/$DOMAIN/g" nginx-ssl.conf

echo "✅ Configuration updated"
echo ""
echo "🐳 Step 2: Starting containers in HTTP-only mode..."

# Start with HTTP only first (without SSL volume mounts)
docker-compose down 2>/dev/null

# Create temporary nginx config for certificate verification
cat > nginx-temp.conf << 'EOF'
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;

    # Let's Encrypt verification - MUST be first
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    # Serve the app for other requests
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Create temporary docker-compose for initial setup
cat > docker-compose-temp.yml << EOF
services:
  jmd-website:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: jmd-supply-chain
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx-temp.conf:/etc/nginx/conf.d/default.conf:ro
      - /var/www/certbot:/var/www/certbot:rw
    networks:
      - jmd-network

networks:
  jmd-network:
    driver: bridge
EOF

docker-compose -f docker-compose-temp.yml up -d

echo "⏳ Waiting for nginx to start..."
sleep 10

echo ""
echo "🔐 Step 3: Obtaining SSL certificate from Let's Encrypt..."

# Get SSL certificate
docker run -it --rm \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/www/certbot:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  --force-renewal \
  -d $DOMAIN \
  -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL certificate obtained successfully!"
    echo ""
    echo "🔄 Step 4: Restarting containers with SSL enabled..."
    
    # Stop temporary setup
    docker-compose -f docker-compose-temp.yml down
    rm docker-compose-temp.yml
    rm nginx-temp.conf
    
    # Start with full SSL configuration
    docker-compose up -d --build
    
    echo ""
    echo "✅ SSL setup complete!"
    echo ""
    echo "🌐 Your website is now available at:"
    echo "   https://$DOMAIN"
    echo "   https://www.$DOMAIN"
    echo ""
    echo "🔒 Certificate will auto-renew every 12 hours"
    echo ""
else
    echo ""
    echo "❌ Failed to obtain SSL certificate"
    echo "Please check:"
    echo "  1. Domain DNS is pointing to this server"
    echo "  2. Port 80 is open in security group"
    echo "  3. Domain is accessible via http://$DOMAIN"
    echo ""
    # Cleanup
    docker-compose -f docker-compose-temp.yml down 2>/dev/null
    rm docker-compose-temp.yml 2>/dev/null
    rm nginx-temp.conf 2>/dev/null
    
    exit 1
fi
