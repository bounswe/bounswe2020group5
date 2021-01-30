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
* `python manage.py migrate`
* `python manage.py runserver`
 
 Now that the server’s running, visit http://127.0.0.1:8000/api/swagger with your Web browser to check api endpoints. 
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
