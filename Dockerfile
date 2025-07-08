FROM node:20-alpine

# 1. diretório de trabalho
WORKDIR /app

# 2. instala dependências
COPY package*.json ./
RUN npm ci --omit=dev

# 3. copia o restante do código
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
