# Node.js LTS Alpine image for minimal production footprint
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy backend dependency definitions
COPY backend/package*.json ./backend/

# Install production dependencies only
WORKDIR /app/backend
RUN npm ci --only=production

# Return to root and copy full source code
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose server port
EXPOSE 5000

# Start server
CMD ["node", "backend/server.js"]
