FROM node:12.16.1 as build-step
RUN mkdir -p /screenshare
WORKDIR /screenshare
COPY package.json /screenshare
RUN npm install
COPY . /screenshare
RUN npm run build --prod
