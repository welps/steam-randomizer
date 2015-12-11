var UsersController = UsersController || {};
var UserModel  = require('../models/user');

UsersController.addUser = function(req, res){
   UserModel.count({ steamID: req.body.steamID }, function (err, count){
       if (count === 0){
           UserModel.create(req.body, function (err) {
               if (err) console.log(err);
           });
       }
       else {
           UserModel.findOneAndUpdate({ steamID: req.body.steamID}, req.body, function(err){
               if (err) console.log(err);
           });
       }
   });
};

UsersController.getUser = function(req, res){

};

UsersController.deleteUser = function(req, res){

};

module.exports = UsersController;
