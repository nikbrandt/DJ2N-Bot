exports.run = async message => {
	if (!message.member.roles.cache.find(role => role.name === 'pin power')) return message.channel.send('you do not have the power to pin. ask for it.');
	if (!message.args[0]) return message.channel.send('please specify a message ID to pin (right click message -> copy ID). you\'ll need to enable developer mode under discord settings -> appearance.');
	if (!parseInt(message.args[0])) return message.channel.send('that ain\'t a valid ID my dude (right click message -> copy ID). ask nik for more help.');
	if (message.args[0].length < 17 || message.args[0].length > 19) return message.channel.send('that ain\'t a valid ID my dude (right click message -> copy ID). ask nik for more help.')

	let fetchedMessage = await message.channel.messages.fetch(message.args[0]);
	if (!fetchedMessage) return message.channel.send('i couldn\'t find the message you were searching for. please make sure you\'re in the right channel.');
	if (!fetchedMessage.pinnable) return message.channel.send('i can\'t pin that message. odd. ask nik about this.');
	if (fetchedMessage.pinned) return message.channel.send('that message is already pinned. please ask an admin to unpin it, if that\'s what your going for.');

	fetchedMessage.pin().catch(err => {
		message.channel.send('i couldn\'t pin the message :(\nerror: ' + err.toString());
	});
};