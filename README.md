# Car CRUD with Pie Chart

An application where user can add car data through a CSV, update data end delete data.
A piechart is also shown to reflect on the current data on a page.

The backend of this project is developed in Rails and the Frontend part in react. To run this project in
the local machine, we have to install both `Rails` and `Node`.

**Setup**

- Clone the repository
  ```bash
  git@github.com:rajibds/car-crud-with-piechart.git
  ```
- Homebrew:
  ```bash
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
- rbenv:

  ```bash
  brew install rbenv ruby-build

  # Add rbenv to bash so that it loads every time you open a terminal
  echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
  source ~/.bash_profile

  # Install Ruby
  rbenv install 2.7.1
  rbenv global 2.7.1

  # Check if 2.7.1 is installed
  ruby -v
  ```

- PostgreSQL

  ```bash
  brew install postgresql

  # To have launchd start postgresql at login:
  brew services start postgresql
  ```

- nvm

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

  # install node(>10.13.0)
  nvm install 12
  nvm use 12
  ```

- Dependency installation

  ```bash
  gem install bundler
  brew install yarn
  bundle install
  yarn install
  ```

- Database initialization

  ```bash
  rails db:create
  rails db:schema:load
  rails db:seed
  ```

- Foreman installation

  ```bash
  gem install foreman
  ```

- Server Start
  ```bash
  foreman s
  ```
