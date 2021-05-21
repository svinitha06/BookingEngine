FROM node:8
COPY package*.json ./
RUN npm install
EXPOSE 8085
CMD ["npm","start"]
