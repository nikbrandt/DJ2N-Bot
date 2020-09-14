const moment = require('moment');
const ytdl = require('ytdl-core');

const LIVESTREAM = '5qap5aO4i9A';
const ONE_AM = 'lTRiuFIWV54';
const TWO_AM = 'wAPCSnAhhC8';
const THREE_AM = 'BTYAsjAVa3I';

const LIVE_OPTIONS = { quality: 'highestaudio', begin: Date.now() - 1000 * 30 };
const VIDEO_OPTIONS = { quality: 'highestaudio' };

class LibraryMusicData {
	constructor(channel, start) {
		this.channel = channel;
		this.start = start;
	}

	get elapsedTime() {
		return Date.now() - this.start;
	}
}

class LibraryMusic {
	constructor(client) {
		this.client = client;
		this.guilds = {};
	}

	attemptStart(channel) {
		if (this.guilds[channel.guild.id]) return;

		this.start(channel);
	}

	start(channel) {
		channel.join().then(connection => {
			this.play(connection);
			this.guilds[channel.guild.id] = new LibraryMusicData(channel, Date.now());
		});
	}

	play(connection, retry = 0) {
		const curHour = moment().format('H');
		let id;
		let live = false;

		switch (curHour) {
			case '1':
				id = ONE_AM;
				break;
			case '2':
				id = TWO_AM;
				break;
			case '3':
				id = THREE_AM;
				break;
			default:
				id = LIVESTREAM;
				live = true;
				break;
		}

		const stream = ytdl(id, live ? LIVE_OPTIONS : VIDEO_OPTIONS);
		const dispatcher = connection.play(stream);

		dispatcher.on('error', error => {
			console.error('Error playing library music:');
			console.error(error);

			if (Date.now() - retry < 1000) return connection.disconnect();

			this.play(connection, Date.now());
		});

		dispatcher.on('end', () => {
			this.play(connection);
		});
	}

	attemptEnd(channel) {
		if (channel.members.size >= 2) return;
		if (!this.guilds[channel.guild.id]) return;

		this.end(channel);
	}

	end(channel) {
		delete this.guilds[channel.guild.id];

		channel.leave();
	}
}

module.exports = LibraryMusic;