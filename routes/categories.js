'use strict';

const router = require('koa-router')({
  prefix: '/categories'
});
const categoriesController = require('./../controllers/categories');

router.post('/', categoriesController.add);
router.put('/:id', categoriesController.update);

module.exports = router;
