FROM node:latest AS builder

WORKDIR /frontend

COPY . /frontend
#ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]