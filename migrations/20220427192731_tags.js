'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('description', 255);
    table.integer('post_id').unsigned();

    table.foreign('post_id').references('id').inTable('posts');

    table.index(["id", "name"], "idx_tags_1");
    
    table.comment('Table from tags');
    table.engine('InnoDB');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
