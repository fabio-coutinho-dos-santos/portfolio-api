FROM node:18

WORKDIR /app

COPY . /app

RUN npm install && npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]