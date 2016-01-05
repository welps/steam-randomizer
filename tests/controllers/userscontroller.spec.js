var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var rewire = require('rewire');

var UsersController = rewire('../../controllers/userscontroller');
var req, res, next;

describe('Users Controller', function(){
    beforeEach(function(){
        req = {};
        req.body = {steamID: 12345, displayName: 'Mangos'};
        req.params = {id: 12345, numRequested: 5};
        res = {};
        res.send = sinon.spy();
        next = function (err) {if (err) return err;};
    });

    describe('addUser()', function(){
        it('should pass the steamID, req.body, and a callback to model', function(){
            UsersController.__with__({
                UserModel: {
                    addUser: function(steamID, userData, cb){
                        expect(steamID).to.equal(req.body.steamID);
                        expect(userData).to.equal(req.body);
                        expect(userData.displayName).to.equal(req.body.displayName);
                        expect(cb).to.be.a('function');
                    }
                }
            })(function(){
                UsersController.addUser(req, res, next);
            });
        });
    });

    describe('getUser()', function(){
        it('should pass the id from request and a callback to model', function(){
            UsersController.__with__({
                UserModel: {
                    getUser: function(steamID, cb){
                        expect(steamID).to.equal(req.params.id);
                        expect(cb).to.be.a('function');
                    }
                }
            })(function(){
                UsersController.getUser(req, res, next);
            });
        });

        it('should pass a callback that calls res.send with returned data from model', function(){
            UsersController.__with__({
                UserModel: {
                    getUser: function(steamID, cb){
                        var userData = {
                            displayName: req.body.displayName
                        }
                        cb(null, userData);

                        var passedUserData = res.send.getCall(0).args[0];
                        expect(passedUserData.displayName).to.equal(req.body.displayName);
                    }
                }
            })(function(){
                UsersController.getUser(req, res, next);
            });
        });
    });

    describe('updateUser()', function(){
        it('should pass the steamID, req.body, and a callback to model', function(){
            UsersController.__with__({
                UserModel: {
                    updateUser: function(steamID, userData, cb){
                        expect(steamID).to.equal(req.body.steamID);
                        expect(userData).to.equal(req.body);
                        expect(userData.displayName).to.equal(req.body.displayName);
                        expect(cb).to.be.a('function');
                    }
                }
            })(function(){
                UsersController.updateUser(req, res, next);
            });
        });
    });

    describe('addGames()', function(){
       it('should pass the steamID, req.body.games, and a callback to model', function(){
           req.body.games = {game1: {name: 'Fake Game 1'}};

           UsersController.__with__({
                UserModel: {
                    addGames: function(steamID, gamesData, cb){
                        expect(steamID).to.equal(req.body.steamID);
                        expect(gamesData.game1.name).to.equal(req.body.games.game1.name);
                        expect(cb).to.be.a('function');
                    }
                }
           })(function(){
                UsersController.addGames(req, res, next);
           });
       });
    });

    describe('getRandomGame()', function(){
        it('should pass the id and number of games to retrieve from request and a callback to model', function(){
            UsersController.__with__({
                UserModel: {
                    getRandomGame: function(steamID, numRequested, cb){
                        expect(steamID).to.equal(req.params.id);
                        expect(numRequested).to.equal(req.params.numRequested);
                        expect(cb).to.be.a('function');
                    }
                }
            })(function(){
                UsersController.getRandomGame(req, res, next);
            });
        });

        it('should pass a callback that calls res.send with returned data from model', function(){
            UsersController.__with__({
                UserModel: {
                    getRandomGame: function(steamID, numRequested, cb){
                        var gameData = {
                            games: {
                                game1: {name: 'Fake Game 1'}
                            }
                        }

                        cb(null, gameData);

                        var passedGameData = res.send.getCall(0).args[0];
                        expect(passedGameData.games.game1.name).to.equal(gameData.games.game1.name);
                    }
                }
            })(function(){
                UsersController.getRandomGame(req, res, next);
            });
        });
    });
});