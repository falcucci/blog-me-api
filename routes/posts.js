'use strict';

const router = require('koa-router')({
  prefix: '/posts'
});
const postsController = require('./../controllers/posts');

router.post('/', postsController.add);
router.put('/:id', postsController.update);

module.exports = router;
