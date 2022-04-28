'use strict';

const request = require('supertest');
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('./../app');
const config = require('config');
const basePath = config.application.basePath;
const HttpStatus = require("http-status-codes");

chai.use(chaiHttp);
chai.should();

const longString = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`


const server = app.listen();

describe('route /posts', () => {
  describe('Get post', () => {
    it('should get a post by its id', async function() {
      const url = basePath + '/posts/2';
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .get(url)
        .set(headers)
      res.should.have.status(HttpStatus.OK);  
    })

    it(`should try to get a post by its id but returns not found`,
      async function() {
        const url = basePath + '/posts/999';
        const headers = { "Accept": 'application/json' };
        const res = await chai
          .request(server)
          .get(url)
          .set(headers)
        res.should.have.status(HttpStatus.NOT_FOUND);  
      })
  })
  describe('Add posts', () => {
    it('should create a post', async function() {
      const url = basePath + '/posts';
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .post(url)
        .set(headers)
        .send({
          title: 'testing',
          author: 'Alexsander',
          content: 'testing',
          image: 'testing'
        });
      res.should.have.status(HttpStatus.CREATED); 
    })

    it(`should fail trying to create a post longer than 255
      characters as title`,
      async function() {
        const url = basePath + '/posts';
        const headers = { "Accept": 'application/json' };
        const res = await chai
          .request(server)
          .post(url)
          .set(headers)
          .send({
            title: longString,
            content: 'testing',
            image: 'testing'
          });
        res.should.have.status(HttpStatus.BAD_REQUEST);  
      })

    it(`should fail trying to create a post longer than 1024
      characters as content`,
      async function() {
        const url = basePath + '/posts';
        const headers = { "Accept": 'application/json' };
        const res = await chai
          .request(server)
          .post(url)
          .set(headers)
          .send({
            title: 'testing',
            content: longString.repeat(100),
            image: 'testing'
          });
        res.should.have.status(HttpStatus.BAD_REQUEST);  
      })

    it(`should fail trying to create a post without required
      fields`, async function() {
        const url = basePath + '/posts';
        const headers = { "Accept": 'application/json' };
        const res = await chai
          .request(server)
          .post(url)
          .set(headers)
          .send({
            title: 'testing',
            image: 'testing'
          });
        res.should.have.status(HttpStatus.BAD_REQUEST);  
      })

  })


  describe('Update posts', () => {
    it('should update a post title only', async function() {
      const url = basePath + `/posts/5`;
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          title: 'testing2'
        });
      res.should.have.status(HttpStatus.OK); 
    })

    it('should update a post content only', async function() {
      const url = basePath + `/posts/5`;
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          content: 'testing2'
        });
      res.should.have.status(HttpStatus.OK); 
    })

    it('should update a post image only', async function() {
      const url = basePath + `/posts/5`;
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          image: 'http://google.com'
        });
      res.should.have.status(HttpStatus.OK); 
    })

    it('should update all post fields', async function() {
      const url = basePath + `/posts/5`;
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          title: 'testing3',
          content: longString,
          image: 'http://google.com3'
        });
      res.should.have.status(HttpStatus.OK); 
    })

    it('should update post category only', async function() {
      const url = basePath + `/posts/5`;
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          categoryId: 1
        });
      res.should.have.status(HttpStatus.OK); 
    })


    it(`should fail to update a post with a non existent
      category`, async function() {
        const url = basePath + `/posts/5`;
        const headers = { "Accept": 'application/json' };
        const res = await chai
          .request(server)
          .put(url)
          .set(headers)
          .send({
            categoryId: 999
          });
        res.should.have.status(HttpStatus.PRECONDITION_FAILED); 
      })
  })
})

describe('route /posts/:id', () => {
  describe('DELETE a post', () => {
    it('should delete a post with admin user', async function() {
      const url = basePath + `/posts/44`;
      const headers = {
        "Accept": 'application/json',
        "X-User": 'admin'
      };
      const res = await chai
        .request(server)
        .delete(url)
        .set(headers)
      res.should.have.status(HttpStatus.OK);
    })

    it('should delete a post with normal user', async function() {
      const url = basePath + `/posts/44`;
      const headers = {
        "Accept": 'application/json',
        "X-User": 'user'
      };
      const res = await chai
        .request(server)
        .delete(url)
        .set(headers)
      res.should.have.status(HttpStatus.PRECONDITION_FAILED); 
    })
  })
})

describe('route /posts/feed', () => {
  describe('GET all posts to be shown in the feed', () => {
    it('should return all blog posts paginated', async function() {
      const url = basePath + '/posts/feed';
      const headers = { "Accept": 'application/json' };
      const res = await chai.request(server).get(url).set(headers);
      res.should.have.status(HttpStatus.OK);
    })

    it('should filter posts by title', async function() {
      const url = basePath + '/posts/feed';
      const headers = { "Accept": 'application/json' };
      const res =
        await chai
        .request(server)
        .get(url)
        .query({ "title": 'testing3' })
        .set(headers);

      res.should.have.status(HttpStatus.OK); 
    })

    it('should filter posts by category', async function() {
      const url = basePath + '/posts/feed';
      const headers = { "Accept": 'application/json' };
      const res =
        await chai
        .request(server)
        .get(url)
        .query({ "category": 'music unicorn' })
        .set(headers);

      res.should.have.status(HttpStatus.OK); 
    })

    it('should filter posts by tags', async function() {
      const url = basePath + '/posts/feed';
      const headers = { "Accept": 'application/json' };
      const res =
        await chai
        .request(server)
        .get(url)
        .query({ "tags": ['', 'hard'] })
        .set(headers);

      res.should.have.status(HttpStatus.OK); 
    })

  })
})
