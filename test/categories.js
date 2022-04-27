'use strict';

const request = require('supertest');
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('./../app');
const config = require('config');
const basePath = config.application.basePath;
const HttpStatus = require("http-status-codes");

const server = app.listen();

chai.use(chaiHttp);
chai.should();


describe('route /categories', () => {
  describe('Add categories', () => {
    it('should create a category', async function() {
      const url = basePath + '/categories';
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .post(url)
        .set(headers)
        .send({
          name: 'testing',
          description: 'testing'
        });
      res.should.have.status(HttpStatus.CREATED);  
    })
  })

  describe('Update categories', () => {
    it('should update a category by name', async function() {
      const url = basePath + `/categories/1`;
      const headers = { "Accept": 'application/json' };
      const res = await chai
        .request(server)
        .put(url)
        .set(headers)
        .send({
          name: 'testing2'
        });
      res.should.have.status(HttpStatus.OK);  
    })
  })
})
