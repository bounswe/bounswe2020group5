FROM node:15.2.1
ARG KEY
WORKDIR /frontapp

COPY . /frontapp

RUN npm install

RUN cd src/login && node secrets.js 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='

RUN npm install -g serve

RUN npm run build

CMD serve -s build -l 3000


EXPOSE 3000