var SteamController = SteamController || {};
var UsersController = require('./userscontroller');

SteamController.convertToUser = function(req, res){
    req.body = {steamID: req.user.id, displayName: req.user.displayName, avatarURL: req.user.photos[2].value};
    UsersController.addUser(req, res);

    res.redirect('/');
};

module.exports = SteamController;