'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),
    
    // Inserts seed entries
    knex('posts').insert({
      id: 5,
      title: 'assertion 5',
      content: 'assertion 5',
      image: 'http://google.com',
      id_category: null
    }),
    knex('posts').insert({
      id: 44,
      title: 'assertion',
      content: 'assertion',
      image: 'http://google.com',
      id_category: null
    }),
    knex('posts').insert({
      id: 2,
      title: 'assertion',
      content: 'assertion',
      image: 'http://google.com',
      id_category: null
    }),
    knex('posts').insert({
      id: 3,
      title: 'assertion',
      content: 'assertion',
      image: 'http://google.com',
      id_category: null
    }),
  );
};
