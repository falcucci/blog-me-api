<h1 align="center">BLOG ME API</h1>

<p align="center">A Cloud Academy assignment.</p>

___
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/d7855d8ad72609983199)

## Development

Make sure you have installed [Node.js](https://nodejs.org/), [Npm](https://www.npmjs.com) and [Git](https://git-scm.com/) on your development machine. Npm should come with Node.js.
	
Just check them by `git --version`, `node -v` and `npm -v`.

fork and clone this repository to your computer.

```bash
git clone git@github.com:falcucci/blog-me-api.git
```

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

or just run:

```bash
$ sh ./db/01-init.sh
```

 After that you need to install knex to run and setup our migrations as follows:
```bash
$ npm install knex -g
```
now run all migrations
```bash
$ knex migrate:latest 
```
run the seeds

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

### Run server with Docker
you can start the instances using docker compose

```bash
$ docker-compose up
```

to avoid any trouble I highly recommend you to stop your local postgres process
```bash
$ brew services stop postgresql
```


### Features

- [x] CRUD on blog posts (allowing full and partial updates);
- [x] Assigning a blog post to a category;
- [x] Adding/removing tags from a blog post;
- [x] A blog post can only be related to one category;
- [x] Content must not be more than 1024 characters;
- [x] The deletion of a blog post must be performed by ADMINS only;
- [x] The server must start on port 8090;
- [x] Test coverage must be at least 30%;
- [x] Provide a Dockerfile and a docker-compose file;

Searching for a blog post by
- [x] title
- [x] category
- [x] tag(s)
- [x] all of them

### Improvements to do

- add better assertions to check the responses using mocks;
- `stub` and `spy` as the `pg` database and specific methods;
- benchmark as a proof of throughput and test loading performance;
- better docs using jsdocs on methods and/or swagger/blueprint;
