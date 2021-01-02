FROM node:15.2.1
ARG KEY
WORKDIR /frontapp

COPY . /frontapp

RUN npm install

RUN cat src/login/secrets.json

RUN cd src/login && node secrets.js $KEY

RUN cat src/login/secrets.json

RUN npm install -g serve

RUN npm run build

CMD serve -s build -l 3000

EXPOSE 3000