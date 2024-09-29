# Use the official Node.js image.
FROM node:18
# Set the working directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Expose the port that the application will run on
EXPOSE 3001
# Start the application
CMD ["npm", "run", "start:dev"]
