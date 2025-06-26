FROM node:18-alpine

WORKDIR /app

COPY package.json  ./
RUN yarn install

COPY . .

EXPOSE 3003

CMD ["yarn", "run", "dev", "--host", "0.0.0.0"]
