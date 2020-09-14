function ready(client) {
	console.log(`DJ2N Bot is up, doodski. There's like ${client.users.cache.size} users online. idk. ${(Date.now() - client.constructorStart) / 1000}s`);
}

module.exports = ready;