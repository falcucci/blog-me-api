"use strict";
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  application: {
    host: "0.0.0.0",
    port: process.env["PORT"] || 8090,
    basePath: process.env["BASE_PATH"] || "/health",
  },
};
