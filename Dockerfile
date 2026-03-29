FROM node:22-slim

WORKDIR /app

# Copiamos package.json y package-lock.json para aprovechar el cache de Docker
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Vite (5173 por defecto)
EXPOSE 5173

# Corremos en modo dev con host 0.0.0.0 para que sea accesible desde fuera
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
