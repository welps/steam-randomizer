var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var HomeController = require('../../controllers/homecontroller');
var req, res, mockView, mockDataForView;

describe('Home Controller', function(){
    beforeEach(function(){
        req = {};
        res = {};
        req.user = {};
        mockView, mockDataForView = '';

        res.render = sinon.spy();
    });
    describe('getHomepage()', function(){
        it('should render only the homepage if unauthenticated', function(){
            req.isAuthenticated = function() {return false};

            HomeController.getHomepage(req, res);
            expect(res.render.calledOnce).to.equal(true);

            mockView = res.render.getCall(0).args[0]
            mockDataForView = res.render.getCall(0).args[1];

            expect(mockView).to.equal('index');
            expect(mockDataForView).to.not.exist;
        });

        it('should render the homepage and pass data if authenticated', function(){
            req.isAuthenticated = function() {return true};
            req.user.displayName = 'mangos';
            req.user.id = 12345;

            HomeController.getHomepage(req, res);
            expect(res.render.calledOnce).to.equal(true);

            mockView = res.render.getCall(0).args[0];
            mockDataForView = res.render.getCall(0).args[1];

            expect(mockView).to.equal('index');
            expect(mockDataForView.user).to.equal('mangos');
            expect(mockDataForView.steamID).to.equal(12345);
        })
    })
});