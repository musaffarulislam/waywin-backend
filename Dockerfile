FROM node:lts-alpine

WORKDIR /src/index

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 4000

RUN yarn add --dev typescript

RUN yarn build

CMD ["yarn", "prod"]