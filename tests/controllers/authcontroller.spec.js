var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var AuthController = require('../../controllers/authcontroller');
var req, res, next;

describe('Auth Controller', function(){
    describe('authenticateUser()', function() {
        it('should pass req, res, next to passport', function(){
            req = {};
            res = {};

            req.mock = 'Fake Request Property';
            res.mock = 'Fake Response Property';
            next = function(err) {if (err) return err};

            var spy = sinon.spy(AuthController, 'authenticateUser');

            AuthController.authenticateUser(req, res, next);

            var mockRequest = spy.getCall(0).args[0].mock;
            expect(mockRequest).to.equal('Fake Request Property');

            var mockResponse = spy.getCall(0).args[1].mock;
            expect(mockResponse).to.equal('Fake Response Property');

            var mockNext = spy.getCall(0).args[2];
            expect(mockNext).to.be.a('function');

        });
        it('should throw a passport error', function() {
            req = res = {};
            var mockNext = sinon.spy();

            AuthController.authenticateUser(req, res, mockNext);

            var passportError = mockNext.getCall(0).args[0];

            expect(passportError).to.be.instanceof(Error);
            expect(passportError.toString()).to.equal('Error: Unknown authentication strategy "steam"');
        });
    });
});
