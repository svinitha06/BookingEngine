FROM node:14
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm cache clean --force
RUN npm install
RUN npm install validator
RUN  npm install bson
COPY . /app
CMD [ "npm", "start" ]
