async function message(client, message) {
	if (message.author.bot) return;

	const prefix = client.config.prefix;
	if (!message.content.startsWith(client.config.prefix)) return;

	let args = message.content.split(/ +/g);
	if (message.content.toLowerCase().startsWith(prefix + ' ')) args = args.slice(1);
	if (!args[0]) return;
	let command = message.content.substring(prefix.length, prefix.length + 1) !== ' ' ? args[0].slice(prefix.length) : args[0];

	let suffix = message.content.substring(message.content.indexOf(command) + command.length + 1);
	args = args.slice(1);
	command = command.toLowerCase();

	let file = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if (!file) return;

	message.args = args;
	message.suffx = suffix;

	try {
		file.run(message);
	} catch (error) {
		console.error(`Error while running ${command}:`);
		console.error(error);
	}
}

module.exports = message;