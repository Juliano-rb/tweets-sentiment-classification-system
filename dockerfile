FROM node:alpine

WORKDIR /frontend/

COPY . /frontend/

EXPOSE 5000

CMD [ "npx", "serve" ]