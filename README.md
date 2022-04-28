# blog-me-api


## What is this?
A cloud academy assignment

## Usage

install all dependencies:

```bash
$ npm i
```

install postgresql

```bash
$ brew install postgresql
```

and then
```bash
$ psql postgres
```

```bash
$ postgres=# ALTER ROLE blog CREATEDB;
```
now you need to create a db and name it as `blog_db`.

```bash
$ postgres=# CREATE ROLE blog WITH LOGIN PASSWORD localhost;
```

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

Seeds

```bash
$ knex seed:run
```

you can check if everything is fine running the assertions
```bash
$ npm run test
```

<img width="1552" alt="Screen Shot 2022-04-28 at 06 41 39" src="https://user-images.githubusercontent.com/33763843/165677958-4d6ea1ba-1840-41f0-8ef1-d4bce4015f59.png">


### Requirements

- [x] CRUD on blog posts ( allowing full and partial updates )

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
