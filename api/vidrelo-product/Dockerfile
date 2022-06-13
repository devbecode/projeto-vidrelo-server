FROM node:14.17.0-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3003

ENTRYPOINT [ "sh", "/app/scripts/entrypoint.sh" ]
