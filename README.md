# blog-me-api


## What is this?
A cloud academy assignment

## Usage

install all dependencies:

```bash
$ npm i
```

to run the tests you need a db as `blog_db`. After that you need to install knex to run and setup our migrations as follows:
```bash
$ npm install knex -g
```
now run all migrations
```bash
$ knex migrate:latest 
```
you can check if everything is fine running the assertions
```bash
$ npm run test
```

### Requirements

- [x] CRUD on blog posts ( allowing full and partial updates )

- [x] Assigning a blog post to a category;
- [x] Adding/removing tags from a blog post;
- [x] A blog post can only be related to one category;
- [x] Content must not be more than 1024 characters;
- [ ] The deletion of a blog post must be performed by ADMINS only;
- [x] The server must start on port 8090
- [x] Test coverage must be at least 30%

Searching for a blog post by
- [x] title
- [x] category
- [ ] tag(s)
- [ ] all of them
