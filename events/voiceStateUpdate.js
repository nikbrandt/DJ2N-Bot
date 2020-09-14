function voiceStateUpdate(client, oldState, newState) {
	if (oldState.member.id === client.user.id) return;

	// member joins library
	if ((!oldState.channel || oldState.channel.name !== 'Library') && newState.channel && newState.channel.name === 'Library') {
		client.libraryMusic.attemptStart(newState.channel);
	}

	// member leaves library
	if (oldState.channel && oldState.channel.name === 'Library' && (!newState.channel || newState.channel.name !== 'Library')) {
		client.libraryMusic.attemptEnd(oldState.channel);
	}
}

module.exports = voiceStateUpdate;