## How to Prepare Development Environment?
* Pull the code.
* Type `cd /path/to/backend/`.
* Type `source init.sh` to run bash script.
* Virtual environment **venv** is created and activated with required python packages via running bash script **init.sh**.

**Note:** If new python packages are added to **"requirements.txt"**, you have to `source init.sh` again to load these packages into virtual environment.  
***
## How to Start Development Server?
* `cd /path/to/backend/bupazar` 
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






