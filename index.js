const DiscordClass = require('./src/discordbot.js');
const CleverbotClass = require('./src/cleverbot.js');
const config = require('./config.json');
const Settings = require('./src/db/settings.js');
const Users = require('./src/db/users.js');
const action = {
	choose: require('./src/choose.js'),
	coinFlip: require('./src/coinFlip.js'),
	getFact: require('./src/getFact.js'),
	showMe: require('./src/showMe.js')
}

const discord = new DiscordClass();
const cleverbot = new CleverbotClass();
const settingsDb = new Settings('data/settings');
const usersDb = new Users('data/users');
const keys = {
	DiscordKey: {name: 'DiscordKey'},
	CleverbotKey: {name: 'CleverbotKey'},
	CurrencyName: {name: 'CurrencyName'}
}
//TODO: get/set this value
var CurrencyName = 'onion';

//Register commands with the discord bot
require('./src/messages/showMe.js')(discord);
require('./src/messages/choose.js')(discord);
require('./src/messages/coinFlip.js')(discord);
require('./src/messages/facts.js')(discord);
require('./src/messages/currencyAdd.js')(discord, CurrencyName);
require('./src/messages/currencySubtract.js')(discord, CurrencyName);
require('./src/messages/cleverbotLogin.js')(discord);
//Match all other cases to cleverbot
require('./src/messages/cleverbotAsk.js')(discord);

//TODO: Split this into functions
//Start Discord
settingsDb.get(keys.DiscordKey, function(err, doc){
	if(err || doc === null) {
		doc = {value: null};
	}
	discord.authenticate(doc.value, function(err, accepted){
		let data = keys.DiscordKey;
		data.value = accepted;
		settingsDb.set(data);

		//Start Cleverbot
		settingsDb.get(keys.CleverbotKey, function(err, doc){
			if(err || doc === null) {
				doc = {user: null, value: null};
			}
			cleverbot.authenticate(doc, function(err, accepted){
				if(!err){
					let data = keys.CleverbotKey;
					data.user = accepted.user;
					data.value = accepted.key;
					settingsDb.set(data);
				}
			});
		});

		discord.welcomeUsers(false);

		//Register new bot is playing
		new CronJob({ //A job that changes the game the bot is playing periodically
			cronTime: `*/${config.BotIsPlaying.TicksPerMinute} * * * *`,
			onTick: function(){
				discord.client.user.setGame(action.choose(config.BotIsPlaying.Options));
			},
			start: config.BotIsPlaying.StartOnLoad
		});
	});
});