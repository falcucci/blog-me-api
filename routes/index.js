const config = require('config');
const mount = require('koa-mount');

const postsRouter = require('./posts');
const indexController = require('./../controllers/index');

module.exports = function (app) {
  app.use(mount(config.application.basePath, postsRouter.middleware()));
  app.use(require('koa-router')().get(
    config.application.basePath,
    indexController.healthCheck
  ).middleware());
}
