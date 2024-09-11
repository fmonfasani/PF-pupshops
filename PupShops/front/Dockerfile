# Base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the frontend
RUN npm run build

# Use nginx to serve the frontend
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
