FROM node:alpine

RUN npm install webpack -g

ARG NODE_ENV=production

COPY . .

RUN npm install
RUN webpack --config webpack.client.config
RUN webpack --config webpack.server.config

ENTRYPOINT ["/bin/sh"]