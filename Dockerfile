FROM jmfirth/webpack:8-slim

ARG NODE_ENV=production

COPY . .

RUN npm install


ENTRYPOINT ["/bin/sh"]