exports.up = function (knex, Promise) {
  return knex.schema.createTable("categories", function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('description', 255);

    table.comment('Table from categories');

    table.index(['id', 'name'], 'idx_categories_1');
    table.engine('InnoDB');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
