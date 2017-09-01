"use strict";

const getFromURL = require('./util/getFromURL.js');

module.exports = function(message) { 
	let subject = message.cleanContent.split(/fact[s]? about/i)[1].trim();
	let number = parseInt(subject.match(/[\d]+/));
	let url;
	let callback = function(data) {
		message.reply(data);
	}
	if (!Number.isInteger(number)) {
		number = 'random'
	}
	try {
		if(/cat/i.test(subject)) {
			url = 'http://catfacts-api.appspot.com/api/facts';
			callback = function(data) {
				try { 
					return message.reply(JSON.parse(data).facts[0]);
				} catch (e) {
					console.log(e.message);
				}
			}
		} else if (/year/i.test(subject)) {
			url = 'http://numbersapi.com/' + number + '/year';
		} else if (/date/i.test(subject)) {
			let numberTwo = parseInt(subject.match(/[\d]+/g)[1]);
			url = 'http://numbersapi.com/';
			if(number === 'random' || numberTwo === undefined || number > 12 || numberTwo > 32) { //try to make sure the date is simi accurate
				url = url + 'random';
			} else {
				url = url + number + '/' + numberTwo;
			}
			url = url + '/date';
		} else if (/trivia/i.test(subject)) {
			url = 'http://numbersapi.com/' + number + '/trivia';
		} else if (/number/i.test(subject)) {
			url = 'http://numbersapi.com/' + number + '/math';
		} else {
			message.reply('I have facts about cats, years, dates (month/day), numbers, and number trivia.');
			return;
		}
		getFromURL(url, callback);
	} catch (e) {
		console.log(e.message);
		message.reply('I encountered an error getting a fact for you.');
	}
}