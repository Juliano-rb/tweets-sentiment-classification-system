FROM node:alpine

WORKDIR /frontend/

RUN npm install -g http-serve

COPY . /frontend/

EXPOSE 8080

CMD [ "http-serve" ]