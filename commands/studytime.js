const moment = require('moment');

exports.run = message => {
	const musicObject = message.client.libraryMusic.guilds[message.guild.id];
	if (!musicObject) return message.channel.send('nobody\'s studying right now.');

	const elapsed = moment.duration(musicObject.elapsedTime);
	const minutes = elapsed.minutes();
	const hours = elapsed.hours();

	let out = 'study time: ';
	if (hours) out += hours + ' hours, ';
	out += minutes + ' minutes.';

	message.channel.send(out);
};