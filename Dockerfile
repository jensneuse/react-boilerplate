FROM jmfirth/webpack:8-slim

ARG NODE_ENV=production

COPY . .

RUN npm install
RUN npm run build-client
RUN npm run build-server

ENTRYPOINT ["/bin/sh"]