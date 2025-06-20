FROM node:20-alpine

COPY package.json package-lock.json ./
RUN npm i
COPY . .

CMD ["npm", "start"]