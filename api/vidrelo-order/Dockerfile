FROM node:14.17.0-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3005

ENTRYPOINT [ "sh", "/app/scripts/entrypoint.sh" ]
