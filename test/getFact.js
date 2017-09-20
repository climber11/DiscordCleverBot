"use strict";

const assert = require('assert');
const getFact = require('../src/util/getFact.js');
const getRandomInt = require('../src/util/getRandomInt.js');
const getFactMessage = require('../src/messages/getFact.js');

describe('getFact', function(){
	describe('cats', function(){
		it('should return a random fact', function(done){
			getFact('cat', done);
		});
	});
	describe('years', function(){
		it('should return a random fact', function(done){
			getFact('year', done);
		});
		it('should return a specific fact', function(done){
			let number = getRandomInt(100, 2000);
			getFact('year ' + number, function(err, response){
				assert.ok(response);
				assert.ok(response.indexOf(number) !== -1);
				done();
			});
		});
	});
	describe('date', function(){
		it('should return a random fact', function(done){
			getFact('date', done);
		});
		it('should return a specific fact', function(done){
			let month = getRandomInt(1, 12);
			let day = getRandomInt(1, 32);
			getFact('date ' + month + ' ' + day, done);
		});
		it('should return an random fact for invalid month', function(done){
			let month = getRandomInt(-99999, 0);
			let day = getRandomInt(1, 32);
			getFact('date ' + month + ' ' + day, done);
		});
		it('should return an random fact for invalid day', function(done){
			let month = getRandomInt(1, 12);
			let day = getRandomInt(50, 9999);
			getFact('date ' + month + ' ' + day, done);
		});
	});
	describe('number', function(){
		it('should return a random fact', function(done){
			getFact('number', done);
		});
		it('should return a specific fact', function(done){
			let number = getRandomInt(0, 99999);
			getFact('number ' + number, function(err, response){
				assert.ok(response);
				assert.ok(response.indexOf(number) !== -1);
				done();
			});
		});
	});
	describe('trivia', function(){
		it('should return a random fact', function(done){
			getFact('trivia', done);
		});
		it('should return a specific fact', function(done){
			let number = getRandomInt(0, 99999);
			getFact('trivia ' + number, function(err, response){
				assert.ok(response);
				assert.ok(response.indexOf(number) !== -1);
				done();
			});
		});
	});
	describe('Message', function(){
		it('should return sanatized error', function(done){
			getFactMessage(true, function(err, reply){
				if(err){
					return done();
				}
				return done('Did not return error.');
			});
		});
		it('should return error for null input', function(done){
			getFactMessage(null, function(err, reply){
				if(err){
					return done();
				}
				return done('Did not return error.');
			});
		});
		it('should return a reply', function(done){
			let message = 'Please get facts about cats';
			getFactMessage(null, done, {text: message});
		});
	});
});