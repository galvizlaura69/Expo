# Etapa 1: Construcción
FROM node:18 AS builder
WORKDIR /app

# Copiamos los archivos base
COPY package*.json ./
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Compilamos para web
RUN npx expo export --platform web

# Etapa 2: Servidor
FROM nginx:alpine

# Copiamos los archivos compilados al servidor de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
