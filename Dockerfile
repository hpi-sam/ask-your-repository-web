FROM node:8.12.0-alpine

RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app

RUN yarn install

COPY . /src/app

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
