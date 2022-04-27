'use strict';

const router = require('koa-router')({
  prefix: '/tags'
});
const tagsController = require('./../controllers/tags');

router.post('/', tagsController.add);
router.put('/:id', tagsController.update);
// router.get('/:id', tagsController.findById);

module.exports = router;
