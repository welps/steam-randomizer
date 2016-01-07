var AuthController = AuthController || {};
var passport = require('passport');

AuthController.authenticateUser = function(req, res, next){
    passport.authenticate('steam', { failureRedirect: '/' })(req, res, next);
};

AuthController.logoutUser = function(req, res, next){
    req.logout();
    res.redirect('../');
};

module.exports = AuthController;

