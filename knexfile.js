"use strict";
module.exports = {
  development: {
    client: "pg",
    connection: {
      host:
        process.env["DATASOURCES_BLOG_ADDR"] ||
        "localhost",
      port: process.env["DATASOURCES_BLOG_PORT"] || 5432,
      database: process.env["DATASOURCES_BLOG_HOST"] || "blog_db",
      user: process.env["DATASOURCES_BLOG_USER"] || "blog",
      password: process.env["DATASOURCES_BLOG_PASSWORD"] || "localhost",
    },
    pool: {
      min: process.env["DATASOURCES_BLOG_OPTIONS_POOL_MAX"] || 1,
      max: process.env["DATASOURCES_BLOG_OPTIONS_POOL_MIN"] || 5,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./test.sqlite3",
    },
  }
};
