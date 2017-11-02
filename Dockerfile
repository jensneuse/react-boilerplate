FROM node:9.0.0-alpine

ARG NODE_ENV=production

RUN npm install
RUN npm run build-client
RUN npm run build-server

ENTRYPOINT ["/bin/sh"]