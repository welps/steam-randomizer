var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');

/* GET users listing. */
router.get('/user/:id', UsersController.getUser);
router.get('/randomgame/:id', UsersController.getRandomGame);

module.exports = router;
