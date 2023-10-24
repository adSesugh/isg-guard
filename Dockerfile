FROM node:18-alpine3.18

WORKDIR /app

COPY *.json /app/
COPY . /app/

RUN npm install --production
RUN npx prisma generate 
RUN npx prisma migrate --name init

EXPOSE 3000

CMD [ "npm", "start"]