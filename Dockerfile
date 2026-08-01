# Use official Node LTS image
FROM node:20-slim AS builder

WORKDIR /app

# Install dev dependencies needed for build
COPY package.json package-lock.json* tsconfig.json ./
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN npm ci --omit=optional

# Copy source and build
COPY . .
# Build frontend and bundle server (matches package.json build script)
RUN npm run build

# Production image
FROM node:20-slim AS runtime
WORKDIR /app

# Copy package.json to install only production deps (if any native prod deps exist)
COPY package.json ./
RUN npm ci --production --omit=dev --no-audit --no-fund

# Copy built app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public 2>/dev/null || true

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "dist/server.cjs"]
