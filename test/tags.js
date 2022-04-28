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

const server = app.listen();


describe('route /tags', () => {
  describe('CREATE tags', () => {
    it('should create a tag and assign to a post', async function() {
      const url = basePath + '/tags';
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .post(url)
        .set(headers)
        .send({
          name: 'tag1',
          description: 'tag1',
          postId: 2
        });
      res.should.have.status(HttpStatus.CREATED);  
    })

    it('should validate post id if given', async function() {
      const url = basePath + '/tags';
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .post(url)
        .set(headers)
        .send({
          name: 'tag1',
          description: 'tag1',
          postId: 999
        });
      res.should.have.status(HttpStatus.PRECONDITION_FAILED);   
    })

    it.skip('should unassign tag from a post', async function() {
      const url = basePath + '/tags/5';
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          name: 'tag1',
          description: 'tag1',
          postId: null
        });
      res.should.have.status(HttpStatus.OK);
    })
  })
})
