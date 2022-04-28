# blog-me-api


## What is this?
A cloud academy assignment

___
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/d7855d8ad72609983199)

## Usage

install all dependencies:

```bash
$ npm i
```

install postgresql

```bash
$ brew install postgresql
```

initialize postgres

```bash
$ psql postgres
```
grants all privileges for the user

```bash
$ postgres=# ALTER ROLE blog CREATEDB;
```

create a new user and the password as follows
```bash
$ postgres=# CREATE ROLE blog WITH LOGIN PASSWORD localhost;
```
now you need to create a db and name it as `blog_db`
```bash
$ postgres=# CREATE DATABASE blog_db;
```

 After that you need to install knex to run and setup our migrations as follows:
```bash
$ npm install knex -g
```
now run all migrations
```bash
$ knex migrate:latest 
```

### Containers
you can just start the instances using docker compose

```bash
$ docker-compose up
```

Seeds

```bash
$ knex seed:run
```

you can check if everything is fine running the assertions
```bash
$ npm run test
```
generate coverage
```bash
$ npm run coverage
```
<img width="1552" alt="Screen Shot 2022-04-28 at 06 41 39" src="https://user-images.githubusercontent.com/33763843/165677958-4d6ea1ba-1840-41f0-8ef1-d4bce4015f59.png">


### Features

- [x] CRUD on blog posts (allowing full and partial updates)

- [x] Assigning a blog post to a category;
- [x] Adding/removing tags from a blog post;
- [x] A blog post can only be related to one category;
- [x] Content must not be more than 1024 characters;
- [x] The deletion of a blog post must be performed by ADMINS only;
- [x] The server must start on port 8090
- [x] Test coverage must be at least 30%

Searching for a blog post by
- [x] title
- [x] category
- [x] tag(s)
- [x] all of them

### Improvements to do

- add better assertions to check the responses using mocks;
- `stub` and `spy` methods as the pg database and specific methods;
- benchmark as a proof of throughput and test loading performance;
- better docs using jsdocs on methods and/or swagger/blueprint;
