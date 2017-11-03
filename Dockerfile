FROM node:alpine as build

RUN npm install webpack -g
RUN npm link webpack

# If NODE_ENV != production, npm install adds devDependencies (neccessary to build) too.
ARG NODE_ENV=build

COPY . .

RUN npm install
RUN webpack --config webpack.client.config
RUN webpack --config webpack.server.config

# Begin final Image
FROM node:alpine

# Copy the already built application from the intermediate container.
COPY --from=build ./dist .

# Copy the package json from source to install runtime dependencies
COPY package.json .

# install runtime dependencies only
RUN npm install --production

ENTRYPOINT ["/bin/sh"]