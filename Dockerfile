# build stage
FROM node:10.15.1-alpine as build-stage

ARG ENVIRONMENT=production

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build:$ENVIRONMENT

# production stage
FROM nginx:1.13.12-alpine as production-stage

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html
COPY --from=build-stage /app/build ./

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
