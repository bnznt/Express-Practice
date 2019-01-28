var express = require('express');

var router = express.Router();

var controller = require('../controllers/auth.controller');

router.get('/signin', controller.signin)

router.post('/signin', controller.postSignin)

router.get('/signout', controller.signout)

router.get('/signup', controller.signup)

router.post('/signup', controller.postSignup)

module.exports = router;