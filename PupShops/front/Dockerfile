# Etapa 1: Compilación de la aplicación
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Etapa 2: Servir la aplicación usando NGINX
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
