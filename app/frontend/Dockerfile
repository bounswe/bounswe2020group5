FROM node:15.2.1

WORKDIR /frontapp

COPY . /frontapp

RUN npm install

RUN npm install -g serve

RUN npm run build

CMD serve -s build -l 3000


EXPOSE 3000
