# BookPage

## Description

This is a web page created as a project for my course on university called Frontend Development. The task was to create an application in React with redux. I've created an app where you can add books and their authors and then review the books.

## Tech Stack

### Frontend:

- ReactJS
- Bootstrap 5
- Redux
- normalizr
- react-select
- formik
- react router
- redux-api-middleware
- redux-i18n
- redux-logger
- redux-thunk
- yup

### Backend:

- NodeJS
- mongoose
- express

### Database:

- MongoDB

### Load balancing:

- Nginx

### DevOps:

- Docker
- docker-compose

## Running aplication

If you want to run this application on your own machine you need to install [Docker](https://www.docker.com/get-started/) and [docker-compose](https://docs.docker.com/compose/install/) and if you are on Windows you'll need to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install). Then you can paste in
`sudo docker-compose up --build`
while being in root directory of this project. Then app will be running on [http://localhost:9090](http://localhost:9090) and API will be available on [http://localhost:9090/api](http://localhost:9090/api)
