var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var rewire = require('rewire');

var SteamController = rewire('../../controllers/steamcontroller');
var req, res, next;

/* helper methods */
function prepareTestUser(req){
    req.user = {};
    req.user.id = 12345;
    req.user.displayName = 'mangos';
    req.user.photos = [{value: 'imageurl1'}, {value: 'imageurl2'}, {value: 'imageurl3'}];
    
    return req;
}

function expectTestUserToPassIntoReqBody(req){
    var steamID = req.body.steamID;
    var displayName = req.body.displayName;
    var avatarURL = req.body.avatarURL;

    expect(steamID).to.equal(req.user.id);
    expect(displayName).to.equal(req.user.displayName);
    expect(avatarURL).to.equal(req.user.photos[2].value);
}

describe('Steam Controller', function () {
    beforeEach(function(){
        req = {};
        res = {};
        next = function (err) {if (err) return err;};
    });
    describe('bringInUserData()', function () {
        it('should prepare user data if req.user exists', function () {
            req = prepareTestUser(req);

            SteamController.bringInUserData(req, res, next);

            expectTestUserToPassIntoReqBody(req);
        });

        it('should not prepare user data if req.user does not exist', function(){
            SteamController.bringInUserData(req, res, next);

            expect(req.body).to.not.exist;
        });

        it('should pass request to users controller if req.user exists', function(){
            req = prepareTestUser(req);

            SteamController.__with__({
                UsersController: {
                    addUser: function(req, res, next){
                        expectTestUserToPassIntoReqBody(req);
                    }
                }
            })(function(){
                SteamController.bringInUserData(req, res, next);
            });
        });

        it('should pass request to getUsersGames() if req.user exists', function(){
            req = prepareTestUser(req);

            SteamController.__with__({
               SteamController: {
                    getUsersGames: function(req, res, next){
                        expectTestUserToPassIntoReqBody(req);
                    }
                }
            })(function(){
                SteamController.bringInUserData(req, res, next);
            });
        });
    });
    describe('getUsersGames()', function(){
        beforeEach(function(){
            req = prepareTestUser(req)
            req.body = {};
            res.redirect = sinon.spy();
        });

        it('should pass parameters to the steam api wrapper method getOwnedGames()', function(){
            SteamController.__with__({
                steamServiceMock: {
                    getOwnedGames: function(steamParameters){
                        expect(steamParameters.steamid).to.equal(req.user.id);
                        expect(steamParameters.include_appinfo).to.equal(1);
                        expect(steamParameters.include_played_free_games).to.equal(1);
                    }
                }
            })(function(){
                SteamController.getUsersGames(req, res, next);
            });
        });

        it('should pass a callback that sets req.body to returned data', function(){
            SteamController.__with__({
                UsersController: {
                    addGames: function(){}
                },
                steamService: {
                    getOwnedGames: function(steamParameters){
                        expect(steamParameters.callback).to.be.a('function');

                        data = {};
                        data.response = {games: 'mockGame1'};

                        steamParameters.callback(null, data);
                    }
                }
            })(function(){
                SteamController.getUsersGames(req, res, next);

                expect(req.body.steamID).to.equal(req.user.id);
                expect(req.body.games).to.equal('mockGame1');
            });
        });

        it('should pass a callback that passes data to UsersController.addGames()', function(){
            SteamController.__with__({
                UsersController: {
                    addGames: function(req, res, next){
                        expect(req.body.steamID).to.equal(req.user.id);
                        expect(req.body.games).to.equal('mockGame1');
                    }
                },
                steamService: {
                    getOwnedGames: function(steamParameters){
                        data = {};
                        data.response = {games: 'mockGame1'};

                        steamParameters.callback(null, data);
                    }
                }
            })(function(){
                SteamController.getUsersGames(req, res, next);
            });
        });

        it('should pass a callback that redirects to /', function(){
            SteamController.__with__({
                UsersController: {
                    addGames: function(){}
                },
                steamService: {
                    getOwnedGames: function(steamParameters){
                        data = {};
                        data.response = {games: 'mockGame1'};

                        steamParameters.callback(null, data);
                    }
                }
            })(function(){
                SteamController.getUsersGames(req, res, next);

                expect(res.redirect.getCall(0).args[0]).to.equal('/');
            });
        });
    });
});
