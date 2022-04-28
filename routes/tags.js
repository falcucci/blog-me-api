'use strict';

const router = require('koa-router')({
  prefix: '/tags'
});
const tagsController = require('./../controllers/tags');

router.put('/:id', tagsController.update);

module.exports = router;
