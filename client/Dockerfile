FROM node:14
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm cache clean --force
RUN npm install
RUN npm install validator
COPY . /app
CMD [ "npm", "start" ]
