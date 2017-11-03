FROM node:alpine

RUN npm install webpack -g
RUN npm link webpack

ARG NODE_ENV=production

COPY . .

RUN npm install --only=prod
RUN cp /node_modules /node_modules_prod
RUN npm install --only=dev
RUN webpack --config webpack.client.config
RUN webpack --config webpack.server.config

# Begin final Image
FROM node:alpine

# Copy the already built application from the intermediate container.
COPY --from=0 /dist .

# Copy production dependencies
COPY --from=0 /node_modules_prod /node_modules

ENTRYPOINT ["/bin/sh"]