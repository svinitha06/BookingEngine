FROM node:8
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 9090
CMD ["npm","start"]
