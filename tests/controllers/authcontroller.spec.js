var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var rewire = require('rewire');

var AuthController = rewire('../../controllers/authcontroller');
var req, res, next;

describe('Auth Controller', function(){
    beforeEach(function(){
            req = {};
            res = {};
            next = function(err) {if (err) return err};
    });

    describe('authenticateUser()', function() {
        it('should pass req, res, next to passport', function(){
            req.mock = 'Fake Request Property';
            res.mock = 'Fake Response Property';

            AuthController.__with__({
               passport: {
                   authenticate: function(strategy, options){
                       return function(req, res, next){
                           expect(req.mock).to.equal('Fake Request Property');
                           expect(res.mock).to.equal('Fake Response Property');
                           expect(next).to.be.a('function');
                       }
                   }
               }
            })(function(){
                AuthController.authenticateUser(req, res, next);
            });
        });

        it('should pass steam and failure redirect options to the passport', function(){
            AuthController.__with__({
                passport: {
                    authenticate: function(strategy, options){
                        expect(strategy).to.equal('steam');
                        expect(options).to.be.an('object');
                        expect(options.failureRedirect).to.equal('../');

                        return function(req, res, next){};
                    }
                }
            })(function(){
                AuthController.authenticateUser(req, res, next);
            });
        });

        it('should throw a passport error because no strategy is loaded', function() {
            req = res = {};
            var mockNext = sinon.spy();

            AuthController.authenticateUser(req, res, mockNext);

            var passportError = mockNext.getCall(0).args[0];

            expect(passportError).to.be.instanceof(Error);
            expect(passportError.toString()).to.equal('Error: Unknown authentication strategy "steam"');
        });

    });

    describe('logoutUser()', function(){
        it('should call req.logout()', function(){
            req.logout = sinon.spy();
            res.redirect = sinon.spy();

            AuthController.logoutUser(req, res, next);
            
            expect(req.logout.calledOnce).to.be.true;
        });

        it('should redirect to the homepage', function(){
            req.logout = sinon.spy();
            res.redirect = sinon.spy();

            AuthController.logoutUser(req, res, next);
            
            expect(res.redirect.getCall(0).args[0]).to.equal('../');
        });
    });
});
