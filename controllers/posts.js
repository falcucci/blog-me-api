'use strict';

const Joi = require('joi');
const HttpStatus = require("http-status-codes");

const models = require('../models');
const boom = require('boom');

function * add() {
  let schema = Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string().max(255).required(),
      content: Joi.string().max(1024).required(),
      image: Joi.string().max(255).required(),
      categoryId: Joi.number().integer()
    })
  });

  const result = Joi.validate(
    { body: this.request.body },
    schema,
    { abortEarly: false }
  );

  if(result.error) {
    throw result.error;
  }

  const post = yield models.post.create(result.value.body);

  if(!post) {
    throw boom.notFound('Post Not Found');
  }

  this.status = HttpStatus.CREATED;
  this.body = post; 
  
}

function * update() {
  const schema = Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
      title: Joi.string().max(255),
      content: Joi.string().max(1024),
      image: Joi.string().max(255),
      categoryId: Joi.number().integer()
    })
  });

  const result = Joi.validate(
    { params: this.params, body: this.request.body },
    schema,
    { abortEarly: false }
  );

  if(result.error) {
    throw result.error;
  }

  const post = yield models.post.update(
    result.value.body,
    result.value.params.id
  );

  if(!post) {
    throw boom.notFound('Post Not Found');
  }

  this.status = HttpStatus.OK;
  this.body = post; 
}

module.exports.add = add;
module.exports.update = update;
