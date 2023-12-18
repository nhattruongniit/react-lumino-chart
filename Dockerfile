# Node app
FROM node:14 as build-stage

RUN rm -rf /usr/src/app/

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app


RUN npm install

# WORKDIR /usr/src/app

RUN npm run build

# WORKDIR /usr/src/app
# Bundle app source
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
