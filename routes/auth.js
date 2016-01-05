var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authcontroller');
var SteamController = require('../controllers/steamcontroller');

router.get('/steam', AuthController.authenticateUser);
router.get('/steam/return', AuthController.authenticateUser, SteamController.bringInUserData);
router.get('/logout', AuthController.logoutUser);

module.exports = router;
