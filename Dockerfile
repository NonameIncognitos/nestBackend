FROM node:12.13-alpine

WORKDIR /app

COPY package*json ./

RUN npm install

COPY . .

COPY ./dist ./dist

COPY .env ./

CMD [ "npm", "run", "dev"]