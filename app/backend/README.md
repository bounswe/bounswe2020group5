## How to Prepare Development Environment?
* Pull the code.
* Type `cd /path/to/backend/`.
* Type `virtualenv venv` to create virtual environment venv.
* In order to activate virtual environment venv,
    + In Linux and macOS, type `source venv/Scripts/activate`
    + In Windows, type `venv\Scripts\activate`
* Install required python packages via typing `pip install -r requirements.txt` 
* Virtual environment **venv** is created and activated with required python packages.

**Note:** If new python packages are added to **"requirements.txt"**, you have to type `pip install -r requirements.txt` after venv is activated.
***
## How to Start Development Server?
* `cd /path/to/backend/`
* `python bupazar_config.py 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='`
* `python manage.py migrate`
* `python manage.py runserver`
 
 Now that the server’s running, visit http://127.0.0.1:8000/api/swagger with your Web browser to check api endpoints. In this way, API uses hosted database in MongoDB Atlas.
***
## How to Install MongoDB Dependencies to Use Dumped Database?
* Install MongoDB Database Tools [here](https://www.mongodb.com/try/download/database-tools).
* Install MongoDB Community Server [here](https://www.mongodb.com/try/download/community).
***
## How to Start Development Server using Dumped Database?
* Create a folder `/path/to/MongoDB/data` to restore database.
* Type `mongod --port 27017 --dbpath /path/to/MongoDB/data` 
* `cd /path/to/backend/`
* Type  `mongorestore -d localBupazarDB dump/bupazarDB` to restore database.
* `python bupazar_config.py 'tM6caMoe7fGqdZejfdLjHSyFmgCCb71sQ2XT1yV3n30='`
* `python manage.py migrate`
* `python manage.py runserver --settings=bupazar.dev_settings`
***
## How to Run Unit Tests?
* `cd /path/to/backend/`
* `python manage.py test <Test>`
    + Example: `python manage.py test api.tests.FilterProductTest`

**Note:** You can find tests in `/path/to/backend/api/tests` folder.
***
## API Documentation
* Api documentation can be found [here](http://18.195.107.160:8000/api/swagger).
***
## Database
* We use MongoDB Atlas as cloud database service.
