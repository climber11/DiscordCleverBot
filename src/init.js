"use strict";

const registerCleverbot = require('./init/registerCleverbot.js');
const registerDiscordbot = require('./init/registerDiscordbot.js');
const registerBotIsPlaying = require('./init/registerBotIsPlaying.js');

module.exports = function(settingsDb, usersDb, discord, cleverbot, config){
	registerCleverbot(settingsDb, cleverbot);
	registerDiscordbot(settingsDb, discord, cleverbot, usersDb);
	registerBotIsPlaying(discord, config.BotIsPlaying);
};