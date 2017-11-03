FROM node:alpine

RUN npm install webpack -g
RUN npm link webpack

ARG NODE_ENV=build

COPY . .

RUN npm install
RUN webpack --config webpack.client.config
RUN webpack --config webpack.server.config

ENTRYPOINT ["/bin/sh"]