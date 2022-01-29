const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router.get('/', function(req, res, next) {
  res.send('List of skills: ');
});

/* GET stories listing. */
router.get('/:page?', controller.list);
router.get('/show/:id', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
