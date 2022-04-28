"use strict";
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  application: {
    host: "0.0.0.0",
    port: process.env["PORT"] || 8090,
    basePath: process.env["BASE_PATH"] || "/blog",
  },
  dataSources: {
    blog: {
      name: process.env["DATASOURCES_BLOG_HOST"] || "blog_db",
      username: process.env["DATASOURCES_BLOG_USER"] || "blog",
      password:
        process.env["DATASOURCES_BLOG_PASSWORD"] || "localhost",
      options: {
        dialect: "postgres",
        host: process.env["DATASOURCES_BLOG_ADDR"] || "localhost",
        port: process.env["DATASOURCES_BLOG_PORT"] || 5432,
        debug: false,
        logging: console.log,
        pool: {
          max:
            process.env["DATASOURCES_BLOG_OPTIONS_POOL_MAX"] || 5,
          min:
            process.env["DATASOURCES_BLOG_OPTIONS_POOL_MIN"] || 1,
          idle:
            process.env["DATASOURCES_BLOG_OPTIONS_POOL_IDLE"] ||
            10000,
        },
      },
    },
  },
};
