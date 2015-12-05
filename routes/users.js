var express = require('express');
var router = express.Router();
var usersController = require('../controllers/UsersController');

/* GET users listing. */
router.get('/userlist', usersController.getUserList);
router.post('/adduser', usersController.addUser);
router.delete('/deleteuser/:id', usersController.deleteUser);

module.exports = router;
