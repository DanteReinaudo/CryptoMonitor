FROM node:18-slim

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .
## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait
CMD /wait && npm run dev
