const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');


router.get('/', controller.home);

router.post('/login', controller.login);

module.exports = router;
