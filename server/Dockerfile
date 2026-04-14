FROM node:20-alpine AS base
WORKDIR /app

# Install deps first (cached layer)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

EXPOSE 5000
CMD ["node", "src/index.js"]
