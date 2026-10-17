# ==========================================
# Multi-stage Dockerfile for NexusSales Frontend
# ==========================================

# 1. Builder Stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit || npm install --prefer-offline --no-audit

COPY . .

# Build and export static site to /app/out
RUN npm run build

# 2. Production Runner Stage (Nginx Alpine)
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
