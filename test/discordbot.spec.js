"use strict";

const assert = require('assert');
const discord = require('../src/discordbot.js');

function getEventCount(bot){
	return bot.client._eventsCount;
}

describe('discordbot', function(){
	describe('constructor', function(){
		it('should exist', function(){
			let bot = new discord();
			assert.ok(bot);
		});
		it('should create a client', function(){
			let bot = new discord();
			assert.ok(bot.client);
		});
	});
	describe('registerMessage', function(){
		it('should add messages', function(){
			let bot = new discord();
			let initialLength = getEventCount(bot);
			bot.registerMessage(/expression/, null);
			let secondaryLength = getEventCount(bot);
			assert.equal(initialLength + 1, secondaryLength);
		});
		it('should execute callback on expression match', function(done){
			let bot = new discord();
			bot.registerMessage(/blah/, function(){
				done('called wrong message');
			});
			bot.registerMessage(/hello/, done);
			bot.registerMessage(/yo/, function(){
				done('called wrong message');
			});
			//Mock the message
			bot.client.user = {id: '1'}
			let message = {cleanContent: 'hello world', author: {id: '2'}, isMentioned: function(){return true;}};
			//Emit the message
			bot.client.emit('message', message);
		});
	});
	describe('welcomeUsers', function(){
		it('should register the welcome message if true', function(){
			let bot = new discord();
			let initialLength = getEventCount(bot);
			bot.welcomeUsers(true);
			let secondaryLength = getEventCount(bot);
			assert.equal(initialLength + 1, secondaryLength);
		});
		it('should not register the welcome message if false', function(){
			let bot = new discord();
			let initialLength = getEventCount(bot);
			bot.welcomeUsers(false);
			let secondaryLength = getEventCount(bot);
			assert.equal(initialLength, secondaryLength);
		});
	});
});