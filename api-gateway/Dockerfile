FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install


COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev", "--host", "0.0.0.0"]

FROM node:18-alpine

WORKDIR /app

