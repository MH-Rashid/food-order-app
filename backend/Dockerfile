# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only backend files
COPY . .

# Install dependencies
RUN npm install

# Expose the port your Express server runs on
EXPOSE 3100

# Start the server
CMD ["node", "server.js"]
