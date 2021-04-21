FROM node:alpine

WORKDIR /backend/

COPY package.json package-lock.json ./

RUN npm install

COPY . /backend/

EXPOSE 3333

CMD [ "npm", "start" ]