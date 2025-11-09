# Use Node 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose port 3000 for development server
EXPOSE 3000

# Start development server
CMD ["npm", "start"]
