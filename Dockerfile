FROM node:alpine AS builder

WORKDIR /usr/src/build
COPY . .
RUN apk update && npm i && npm run build

FROM node:alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY --from=builder /usr/src/build/node_modules ./node_modules
COPY --from=builder /usr/src/build/dist ./dist

CMD [ "npm", "run", "prod" ]