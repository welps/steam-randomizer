var AuthController = AuthController || {};
var passport = require('passport');

AuthController.authenticateUser = function(req, res, next){
    passport.authenticate('steam', { failureRedirect: '/' })(req, res, next);
};

module.exports = AuthController;

