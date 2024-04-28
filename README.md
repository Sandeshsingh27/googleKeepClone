
<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Django React Notes App</h3>

  <p align="center">
    A notes app using Django REST Framework and React Js styled
    <br />
    <a href="https://github.com/Jauharmuhammed/notes-app-django-react"><strong>Explore the docs »</strong></a>
    <!-- <br /> -->
    <!-- <a href="https://notes-django-react.up.railway.app/">View Site</a> -->
    ·
    <a href="https://github.com/Sandeshsingh27/myNotes/issues">Report Bug</a>
    ·
    <a href="https://github.com/Sandeshsingh27/myNotes/issues">Request Feature</a>
  </p>
</div>

### Built With

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

<br>


## Setting up Backend API 

This is a sample for Django Project.

Clone the project. This will download the GitHub respository files onto your local machine.

```Shell
git clone https://github.com/Sandeshsingh27/myNotes
```

To get this project up and running you should start by having Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately. You can install virtualenv with

```
pip install virtualenv
```

Clone or download this repository and open it in your editor of choice. In a terminal (mac/linux) or windows terminal, run the following command in the base directory of this project

```
virtualenv env
```

That will create a new folder `env` in your project directory. Next activate it with this command on powershell:

```
env/bin/active
```

Or below command on Bash:
```
env/bin/active
```

Then install the project dependencies with

```
pip install -r requirements.txt
```

Apply migrations and create your database
```
python manage.py migrate
```
Create a user with manage.py
```
python manage.py createsuperuser
```

Now you can run the project with this command

```
python manage.py runserver
```

<br>
<br>
<br>


## Frontend setting up

### Frontend Instructions (Create React App) 

---> Navigate to the `frontend/` directory

```Shell
cd frontend
```

---> Install the project dependencies

```Shell
npm install
```

---> Get ready for development environment

```Shell
npm run build
```

---> Start the development server on localhost:3000

```Shell
npm run start
```

---> Open your browser and navigate to either `http://localhost:3000 or http://127.0.0.1:3000`
<br>
<br>
<br>

</div>