'use strict';

const Joi = require('joi');
const HttpStatus = require("http-status-codes");

const models = require('../models');
const boom = require('boom');

function * add() {
  let schema = Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().max(255).required(),
      description: Joi.string().max(1024).required()
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

  const category = yield models.category.create(result.value.body);

  if(!category) {
    throw boom.notFound('Post Not Found');
  }

  this.status = HttpStatus.CREATED;
  this.body = category; 
  
}

function * update() {
  const schema = Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
      name: Joi.string().max(255),
      description: Joi.string().max(255)
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

  const category = yield models.category.update(
    result.value.body,
    result.value.params.id
  );

  if(!category) {
    throw boom.notFound('Post Not Found');
  }

  this.status = HttpStatus.OK;
  this.body = category; 
}

module.exports.add = add;
module.exports.update = update;
