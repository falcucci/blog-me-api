const config = require('config');
const mount = require('koa-mount');

const postsRouter = require('./posts');
const categoriesRouter = require('./categories');
const indexController = require('./../controllers/index');

module.exports = function (app) {
  app.use(mount(config.application.basePath, postsRouter.middleware()));
  app.use(mount(config.application.basePath, categoriesRouter.middleware()));
  app.use(require('koa-router')().get(
    config.application.basePath,
    indexController.healthCheck
  ).middleware());
}
