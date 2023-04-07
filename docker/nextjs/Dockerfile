FROM node:lts-buster-slim

ENV TZ Asia/Tokyo

WORKDIR /app

COPY /src /app/

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]