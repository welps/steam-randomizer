var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/userscontroller');

/* GET users listing. */
router.get('/userlist', UsersController.getUserList);
router.post('/adduser', UsersController.addUser);
router.delete('/deleteuser/:id', UsersController.deleteUser);

module.exports = router;
