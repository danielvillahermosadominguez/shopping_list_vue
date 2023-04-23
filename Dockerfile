FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build



EXPOSE 8080
EXPOSE 443
CMD sh start.sh