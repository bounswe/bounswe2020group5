# Bupazar System Manual

This document describes how to build, configure and deploy Bupazar app.

## Requirements

- [Docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [git](https://git-scm.com/)

## How to Build & Deploy

### 1. Clone the repository and navigate to the sources root.

```bash
git clone https://github.com/bounswe/bounswe2020group5
cd bounswe2020group5/app
```

### 2. Build & run

```bash
docker-compose up -d --build
```

##### This command run both frontend and backend on your machine. To see the frontend just type http://localhost:3000/.

### 3. If you want to run the app separetely without docker you need to follow these steps.

## To run backend
```
- cd bounswe2020group5/app/backend/
- python3 bupazar_config.py 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='
- pip3 install -r requirements.txt
- python3 manage.py makemigrations
- python3 manage.py migrate
- python manage.py runserver
```

## To run frontend
```
- cd bounswe2020group5/app/frontend/
- npm install
- cd src/login
- node secrets.js 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='
- npm start
```
