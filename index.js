"use strict";

const config = require("config");
const app = require("./app.js");
// require("dnscache")({ enable: true, ttl: 300, cachesize: 1000 });

app.listen(
  config.application.port,
  config.application.host,
  err => {
    if (err) throw err;
    console.log(
      "Server is available on http://" +
        config.application.host +
        ":" +
        config.application.port
    );
  }
);
