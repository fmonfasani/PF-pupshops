# Base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
