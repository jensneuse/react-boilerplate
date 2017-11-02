FROM node:alpine

ARG NODE_ENV=production

RUN mkdir src
COPY . ./src

WORKDIR ./src

RUN npm install
RUN npm run build-client
RUN npm run build-server

ENTRYPOINT ["/bin/sh"]