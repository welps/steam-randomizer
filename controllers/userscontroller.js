var UsersController = UsersController || {};
var UserModel = require('../models/user');

UsersController.addUser = function(req, res, next){
    UserModel.addUser(req.body.steamID, req.body, function (err){
        if (err) return next(err);
    });
};

UsersController.getUser = function(req, res, next){
    UserModel.getUser(req.params.id, function(err, userData){
        if (err) return next(err);
        res.send(userData);
    });
};

UsersController.updateUser = function(req, res, next){
    UserModel.updateUser(req.body.steamID, req.body, function(err){
        if (err) return next(err);
    });
};

UsersController.addGames = function(req, res, next){
    UserModel.addGames(req.body.steamID, req.body.games, function(err){
        if (err) return next(err);
    });
};

UsersController.getRandomGame = function(req, res, next){
    UserModel.getRandomGame(req.params.id, req.params.numRequested, function(err, randomGame){
        if (err) return next(err);
        res.send(randomGame);
    });
};

module.exports = UsersController;
