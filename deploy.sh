#!/bin/bash

# JMD Supply Chain Solutions - Deployment Script
echo "🚀 Starting deployment..."

# Stop and remove existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Remove old images
echo "🗑️  Removing old images..."
docker image prune -f

# Build and start new containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Show container status
echo "✅ Deployment complete!"
echo ""
echo "Container status:"
docker ps

echo ""
echo "🌐 Your website should now be running on http://your-ec2-public-ip"
