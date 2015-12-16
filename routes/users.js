var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');

router.get('/user/:id', UsersController.getUser);
router.get('/randomgame/:id', UsersController.getRandomGame);

module.exports = router;
