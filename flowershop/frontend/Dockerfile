FROM node:18-alpine as build

ARG APP_USER
ARG APP_PASS

ENV REACT_APP_STATIC_USER=$APP_USER
ENV REACT_APP_STATIC_PASS=$APP_PASS

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80