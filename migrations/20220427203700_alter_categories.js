
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('categories', function (table) {
    table.integer('post_id').unsigned();

    table.foreign('post_id').references('id').inTable('posts');
    table.index(['id', 'name', 'post_id'], 'idx_devices_users_1');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('categories', function (table) {
    table.dropColumn('post_id');
  });
};
