FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci --production

COPY . .

ARG MYNAMON_VERSION=dev
ENV MYNAMON_VERSION $MYNAMON_VERSION
ENV MYNAMON_FILE=/mynamon/mynamon.db
ENV NODE_ENV=production

CMD [ "node", "server.js" ]
