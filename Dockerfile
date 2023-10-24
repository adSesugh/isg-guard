FROM node:18-alpine3.18

WORKDIR /app

COPY *.json /app/
COPY . /app/

RUN npm install --production
RUN npx prisma generate 

EXPOSE 8001

CMD [ "npm", "start"]