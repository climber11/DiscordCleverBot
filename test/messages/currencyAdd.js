"use strict";

const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const data = require('../../src/db/users.js');
const getRandomString = require('../../src/util/getRandomString.js');
const currencyAddMessage = require('../../src/messages/currencyAdd.js');
const User = require('../../src/db/class/user.js');
const tmpDataPath = path.join('test','data');

function generateDataFilePath(){
	return path.join(tmpDataPath, getRandomString());
}

describe('Currency', function(){
	describe('Add', function(){
		describe('Message', function(){
			it('should return sanatize error message', function(done){
				currencyAddMessage(true, function(err, reply){
					if(err){
						return done();
					}
					return done('Did not reuturn error.');
				});
			});
			it('should return error message for null text', function(done){
				currencyAddMessage(null, function(err, reply){
					if(err){
						return done();
					}
					return done('Did not reuturn error.');
				});
			});
			it('should return a reply', function(done){
				let userName = getRandomString();
				let userId = userName + 'Id';
				let db = new data(generateDataFilePath());
				let user = new User({name: userId});
				let startingBallance = user.money;
				let amountToAdd = 22;
				let expectedBallance = startingBallance + amountToAdd;
				let message = 'Please give ' + amountToAdd + ' to ' + user.name;
				currencyAddMessage(null, function(err){
					if(err){
						return done(err);
					}
					db.get({name: user.name}, function(err, doc){
						if(err){
							return done(err);
						}
						assert.equal(expectedBallance, doc.money);
						return done();
					});
				}, {text: message, db: db, user: user});
			});
		});
	});
	after(function(){
		if (fs.existsSync(tmpDataPath)){
			rimraf.sync(tmpDataPath);
		}
	});
});