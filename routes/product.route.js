var express = require('express');
var router = express.Router();

var controller = require('../controllers/product.controller')

router.get('/', controller.index);

module.exports = router;