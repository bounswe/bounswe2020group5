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
* `python manage.py runserver`
 
 Now that the server’s running, visit http://127.0.0.1:8000/ with your Web browser. 
***
## Database
* We use MongoDB Atlas as cloud database service.
***
## References
* [The Right Way to Use Virtual Environments](https://medium.com/@jtpaasch/the-right-way-to-use-virtual-environments-1bc255a0cba7)
* [Is it bad to have my virtualenv directory inside my git repository?](https://stackoverflow.com/questions/6590688/is-it-bad-to-have-my-virtualenv-directory-inside-my-git-repository/12657803#12657803)
* [gitignore](https://github.com/github/gitignore/blob/master/Python.gitignore)






