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
- Type virtualenv venv to create virtual environment venv.
- In order to activate virtual environment venv,
    + In Linux and macOS, type source venv/Scripts/activate
    + In Windows, type venv\Scripts\activate
- Install required python packages via typing pip3 install -r requirements.txt
- python3 bupazar_config.py 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='
- python3 manage.py makemigrations
- python3 manage.py migrate
- python3 manage.py runserver
```

## To run frontend
```
- cd bounswe2020group5/app/frontend/
- npm install
- cd src/login
- node secrets.js 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='
- npm start
```

## To run Mobile

* Bupazar adroid project uses the Gradle build system.
* To run this project, open the project in Android Studio. Then you can run the project gradle run command, or you can build apk directly using the build apk command. (Do not extract apk in "release" mode, google sign-in will need a new sha1 key in this case)

#### Dependencies
      - Gradle Version 4.1.0
      - Kotlin Version = 1.4.10
      - Android Studio 3.x

