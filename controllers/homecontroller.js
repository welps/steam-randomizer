var HomeController = HomeController || {};

HomeController.getHomepage = function(req, res){
    if (req.isAuthenticated()){
        res.render('index', {user: req.user.displayName, steamId: req.user.id});
    }
    else {
        res.render('index');
    }
}

module.exports = HomeController;