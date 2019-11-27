FROM node:8

COPY . /usr/src/app

WORKDIR /usr/src/app

# RUN npm i --registry=https://registry.npm.taobao.org

EXPOSE 7001

CMD npm run start_in_docker
