FROM node:18

WORKDIR /app

COPY . /app

RUN npm ci --only-production

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
