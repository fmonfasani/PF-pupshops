# Etapa de construcción
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Servidor de desarrollo
EXPOSE 5173
CMD ["npm", "run", "dev"]
