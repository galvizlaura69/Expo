# Etapa de construcción
FROM node:18 AS builder
WORKDIR /src

# Copiamos archivos y dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npx expo export --platform web

# Etapa de despliegue
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
