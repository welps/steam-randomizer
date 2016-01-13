var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../../app');
var customPath = process.env.CUSTOM_PATH || '';

describe('Integration Tests for Routes', function(){
    describe('Home Route', function(){
        describe('/', function(){
            it('should show the homepage', function(done){
                request(app)
                    .get(customPath + '/')
                    .expect(200, done);
            });
        });
    });

    describe('User Routes', function(){
        describe('/:id', function(done){
            it('should return json', function(done){
                request(app)
                    .get(customPath + '/user/76561197982716017')
                    .expect(200)
                    .end(function(err, res){
                        console.log(res);
                        done();
                    });
            })
        })
    })

    describe('Authentication Routes', function(){
        describe('/auth/steam', function(){
            // This gives an EventEmitter Max Listeners warning because of the redirects offsite? I'm not sure.
            it('should redirect to steam', function(done){
                request(app)
                    .get(customPath + '/auth/steam/')
                    .expect(302, done)
            });
        });
        
        describe('/auth/steam/return', function(){
            it('should redirect to the homepage', function(done){
                request(app)
                    .get(customPath + '/auth/steam/return')
                    .expect(302, done)
            });
        });

        describe('/auth/logout', function(){
            it('should redirect to the homepage', function(done){
                request(app)
                    .get(customPath + '/auth/logout')
                    .expect(302, done)
            });
        });
    });
});