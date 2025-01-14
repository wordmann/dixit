#!/bin/bash

# Pull the latest PostgreSQL image
docker pull postgres:latest

# Run PostgreSQL container
docker run --name postgres-dixit \
    -e POSTGRES_PASSWORD=shadowwizardmoneygang \
    -e POSTGRES_DB=jixit \
    -e POSTGRES_USER=shadowwizard \
    -p 6002:5432 \
    -d postgres:latest

# Wait for container to be ready
echo "Waiting for PostgreSQL to start..."
sleep 5

# Check if container is running
if docker ps | grep -q postgres-dixit; then
    echo "PostgreSQL container is running on port 6002"
else
    echo "Failed to start PostgreSQL container"
    exit 1
fi