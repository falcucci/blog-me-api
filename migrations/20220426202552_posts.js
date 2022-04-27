exports.up = function (knex, Promise) {
  return knex.schema.createTable("posts", function (table) {
    table.increments('id').primary();
    table.string("title", 255).notNullable();
    table.string("content", 1024).notNullable();
    table.string("image", 255).notNullable();

    table.integer("id_category").unsigned();

    table
      .foreign('id_category')
      .references('id')
      .inTable('categories');

    table.comment("Table from posts");
    table.index(["id", "title", "id_category"], "idx_posts_1");
    table.engine("InnoDB");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
