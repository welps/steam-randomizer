var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');

router.get('/:id', UsersController.getUser);
router.get('/:id/randomgame/:numRequested', UsersController.getRandomGame);
router.get('/:id/randomgame/', UsersController.getRandomGame);
module.exports = router;
