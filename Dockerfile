FROM oven/bun:1-alpine

WORKDIR /app

# Install dependencies first (layer cache)
COPY package.json ./
RUN bun install --production

# Copy application source
COPY src ./src

# Run as non-root for security
USER bun

EXPOSE 3000

CMD ["bun", "src/index.js"]