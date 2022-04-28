'use strict';

const Joi = require('joi');
const _ = require('lodash');
const HttpStatus = require("http-status-codes");

const models = require('../models');
const boom = require('boom');

const Users = {
  ADMIN: 'admin',
  USER: 'user'
}


function * findById() {
  let schema = Joi.object().keys({
    id: Joi.number().integer().required()
  });

  const result = Joi.validate(this.params, schema, { abortEarly: false });

  if(result.error) {
    throw result.error;
  }

  let post = yield models.post.findById(result.value.id);

  if(!post) {
    throw boom.notFound('Post Not Found');
  }

  this.body = post; 
}

function * add() {
  let schema = Joi.object().keys({
    body: Joi.object().keys({
      title: Joi.string().max(255).required(),
      author: Joi.string().max(255).required(),
      content: Joi.string().max(1024).required(),
      image: Joi.string().max(255).required(),
      tags: Joi.array(),
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
      author: Joi.string().max(255),
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

  const categoryId = _.get(result, 'value.body.categoryId');
  const category = categoryId
    ? yield models.category.find(categoryId)
    : undefined

  if (categoryId && !category) {
    throw boom.preconditionFailed('Category Must be Valid');
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

function * destroy() {
  const schema = Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.number().integer().required()
    })
  });

  const user = _.get(this, "headers['x-user']")

  if (user !== Users.ADMIN) {
    throw boom.preconditionFailed(
      'You are not allowed to do this operation'
    );
  }

  const result = Joi.validate(
    { params: this.params },
    schema,
    { abortEarly: false }
  );

  if(result.error) {
    throw result.error;
  }

  const post = yield models.post.delete(
    result.value.params.id
  );

  if(!post) {
    throw boom.notFound('Post Not Found');
  }

  this.status = HttpStatus.OK;
}

function * all() {
  let schema = Joi.object().keys({
    title: Joi.string().max(255),
    category: Joi.string().max(255),
    tags: Joi.array(),
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
  });

  const result = Joi.validate(this.query, schema, { abortEarly: false });
  if(result.error) {
    throw result.error;
  }
  const posts = yield models.post.all(
    result.value.title,
    result.value.category,
    result.value.tags,
    result.value.offset,
    result.value.limit
  );
  this.body = posts; 
}

module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.findById = findById;
module.exports.all = all;
