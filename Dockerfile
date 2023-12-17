FROM node:latest as BUILD

ADD . /app
WORKDIR /app

RUN apt update && npm i

CMD [ "npm run prod" ]