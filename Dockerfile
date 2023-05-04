FROM node:lts-alpine
WORKDIR /usr/cwoffee_server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
RUN npm run start
CMD ["node", "dist/server.js"]