# Use Node.js base image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Ensure Prisma uses the correct database URL for Neon.tech
ENV DATABASE_URL=postgresql://neondb_owner:GXRbe9ycBT6N@ep-white-rain-a52ig9pc-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# ✅ Copy email templates separately to avoid missing files
COPY src/email/templates ./src/email/templates

# Build the NestJS app
RUN npm run build

# Create a lightweight production image
FROM node:18-alpine
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/email/templates ./src/email/templates  

# Expose the port
EXPOSE 5000

# Run the NestJS app
CMD ["node", "dist/main.js"]
