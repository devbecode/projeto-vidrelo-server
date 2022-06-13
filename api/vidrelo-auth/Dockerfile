FROM node:14.17.0-alpine

WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install
EXPOSE 3000

ENTRYPOINT [ "sh", "/app/scripts/entrypoint.sh" ]
