# Use the official Node.js image.
FROM node:18
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application files
COPY . .
# Expose the port that the application will run on
EXPOSE 3001
# Start the application
CMD ["npm", "run", "start:dev"]
