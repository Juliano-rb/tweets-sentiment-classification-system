FROM node:alpine

WORKDIR /frontend/

COPY . /frontend/

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]