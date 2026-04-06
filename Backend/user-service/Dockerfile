FROM node:20-alpine

WORKDIR /app

COPY user-service/package*.json ./user-service/
COPY package*.json ./
RUN cd user-service && npm install

COPY prisma ./prisma
COPY user-service ./user-service

WORKDIR /app/user-service
RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
