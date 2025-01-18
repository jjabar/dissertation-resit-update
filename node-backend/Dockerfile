FROM node:20.10.0

WORKDIR /usr/src/app/node_consumer

COPY package*.json .

RUN npm install

COPY . .

#EXPOSE 8000

CMD [ "npm", "run", "dev" ]

