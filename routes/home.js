var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/homecontroller');

router.get('/', HomeController.getHomepage);

module.exports = router;
