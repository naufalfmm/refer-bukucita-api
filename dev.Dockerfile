FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && npm i

COPY . .

CMD [ "npm", "run", "dev" ]