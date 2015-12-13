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
           UsersController.updateUser(req, res);
       }
   });
};

UsersController.getUser = function(req, res){
    UserModel.findOne({ steamID: req.params.id}, function(err, userData){
        res.send(userData);
    });
};

UsersController.updateUser = function(req, res){
    UserModel.findOneAndUpdate({ steamID: req.body.steamID}, req.body, function(err){
        if (err) console.log(err);
    });
};

UsersController.addGames = function(req, res){
    UserModel.findOneAndUpdate({ steamID: req.body.steamID}, { games: req.body.games} , function(err){
       if (err) console.log(err);
    });
};

UsersController.getRandomGame = function(req, res){
    UserModel.findOne({ steamID: req.params.id}, function(err, userData){
        var numGames = userData.games.length;
        var randomNumber = Math.floor(Math.random() * numGames);

        res.send(userData.games[randomNumber]);
    });
};

module.exports = UsersController;
