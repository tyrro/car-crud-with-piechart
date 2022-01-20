# Car CRUD with Pie Chart

An application where user can add car data through a CSV, update data end delete data.
A piechart is also shown to reflect on the current data on a page.

The backend of this project is developed in Rails and the Frontend part in React. Following are the instructions to run the project in local machine:

**Setup**

- Clone the repository

  ```bash
  git clone git@github.com:rajibds/car-crud-with-piechart.git
  ```

- Run Docker

  ```bash
  docker-compose up --build
  docker-compose run web rails db:setup
  ```

Server is now up and running at: http://localhost:3000
