'use strict';

const Joi = require('joi');
const _ = require('lodash');
const HttpStatus = require("http-status-codes");

const models = require('../models');
const boom = require('boom');


function * update() {
  const schema = Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
      name: Joi.string().max(255),
      description: Joi.string().max(255),
      postId: Joi.number().integer().allow(null)
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

  const postId = _.get(result, 'value.body.postId');
  const post = postId
    ? yield models.post.findById(postId)
    : undefined

  if (postId && !post) {
    throw boom.preconditionFailed('Post Must be Valid');
  }

  const tag = yield models.tag.update(
    result.value.body,
    result.value.params.id
  );

  if(!tag) {
    throw boom.notFound('Tag Not Found');
  }

  this.status = HttpStatus.OK;
  this.body = tag; 
}

function * all() {
  let schema = Joi.object().keys({
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
  });

  const result = Joi.validate(this.query, schema, { abortEarly: false });
  if(result.error) {
    throw result.error;
  }

  const posts = yield models.post.all(result.value.offset, result.value.limit);
  this.body = posts; 
}

module.exports.update = update;
