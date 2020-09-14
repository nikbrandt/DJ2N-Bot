const Discord = require('discord.js');

exports.run = message => {
	message.channel.send({
		embed: {
			description: `Does cool things, maybe.\nCreated by Nik B.\n\nNode.js ${process.version}\nDiscord.js v${Discord.version}`,
			author: {
				icon_url: message.client.user.avatarURL(),
				name: 'DJ2N Bot'
			},
			color: 0x018BB3
		}
	});
};