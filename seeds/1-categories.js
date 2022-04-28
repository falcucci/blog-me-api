'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(),
    
    // Inserts seed entries
    knex('categories').insert({
      id: 1,
      name: 'assertion 5',
      description: 'assertion 5',
      post_id: null
    }),
  );
};
