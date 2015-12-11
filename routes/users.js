var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');

/* GET users listing. */
router.post('/adduser', UsersController.addUser);
router.get('/user/:id', UsersController.getUser);
router.delete('/deleteuser/:id', UsersController.deleteUser);

module.exports = router;
