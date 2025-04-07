# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose the port your app runs on (typically 3000 for React)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
