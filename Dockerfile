FROM node:alpine AS builder

ARG NODE_ENV=production

RUN mkdir src
RUN cp . ./src

WORKDIR ./src

RUN npm install
RUN npm run build-client
RUN npm run build-server

ENTRYPOINT ["/bin/sh"]