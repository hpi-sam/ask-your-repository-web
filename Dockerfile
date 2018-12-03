# build stage
FROM node:9.11.1-alpine as build-stage

WORKDIR /app

COPY . .
COPY .env.production .env

RUN yarn install
RUN yarn build

# production stage
FROM nginx:1.13.12-alpine as production-stage

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html
COPY --from=build-stage /app/build ./

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
