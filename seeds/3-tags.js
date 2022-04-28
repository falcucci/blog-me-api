
'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tags').del(),
    
    // Inserts seed entries
    knex('tags').insert({
      id: 29,
      name: 'assertion 5',
      description: 'assertion 5',
      post_id: 3
    }),
  );
};
