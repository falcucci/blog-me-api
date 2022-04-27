exports.up = function(knex, Promise) {
  return knex.schema.alterTable('posts', function (table) {
    table.string("author", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('posts', function (table) {
    table.dropColumn('author');
  });
};
