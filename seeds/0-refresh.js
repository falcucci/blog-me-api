'use strict';

exports.seed = function(knex, Promise) {
  
  return Promise.all([
    // Deletes ALL existing entries
    knex('categories').del(),
    knex('tags').del(),
    knex('posts').del(),
  ]);
};
