FROM node:8
COPY package*.json ./
RUN npm install
EXPOSE 8088
CMD ["npm","start"]
