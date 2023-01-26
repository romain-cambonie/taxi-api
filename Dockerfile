FROM node:18.13.0-buster-slim
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node ./build /usr/src/app/build
COPY --chown=node:node ./package.json /usr/src/app/package.json
COPY --chown=node:node ./package-lock.json /usr/src/app/package-lock.json
RUN npm ci --only=production
USER node
CMD ["dumb-init", "node", "build/server.js"]