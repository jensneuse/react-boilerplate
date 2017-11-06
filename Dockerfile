FROM node:alpine AS builder

ARG NODE_ENV=production

WORKDIR /build

# add the sources to /build
COPY . .

# install production dependencies
RUN npm install --only=prod
# copy production dependencies for later use in the final image
RUN cp -R node_modules/ node_modules_prod/
# install dev dependencies (e.g. webpack) to be able to build/transpile
RUN npm install --only=dev
# build the application
RUN ./node_modules/webpack/bin/webpack.js --config webpack.client.config
RUN ./node_modules/webpack/bin/webpack.js --config webpack.server.config

# begin final image based on the tiniest possible image
FROM mhart/alpine-node:base-9

ENV NODE_ENV=production

WORKDIR /app

# copy the already built application from the intermediate container
COPY --from=builder /build/dist .

# copy production dependencies we put aside at the beginning
COPY --from=builder /build/node_modules_prod ./node_modules/

ENTRYPOINT ["node","./server/server.js"]

# the final image is 51.8 MB whereas the intermediate container comes at 180 MB