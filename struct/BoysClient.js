const fs = require('fs');
const path = require('path');

const { Client } = require('discord.js');

const LibraryMusic = require('./LibraryMusic');

const COMMAND_PATH = path.join(__dirname, '..', 'commands');
const EVENT_PATH = path.join(__dirname, '..', 'events');

class BoysClient extends Client {
	constructor(options) {
		super(options);

		this.constructorStart = Date.now();

		this.commands = new Map();
		this.aliases = new Map();

		this.config = require('../config.json');

		console.log('Loading commands..');
		this._loadCommands();

		console.log('Loading events..');
		this._loadEvents();

		this.libraryMusic = new LibraryMusic();
	}

	_loadCommands(directory = '') {
		const fullPath = path.join(COMMAND_PATH, directory);

		const files = fs.readdirSync(fullPath);

		files.forEach(file => {
			const filePath = path.join(fullPath, file);

			try {
				if (fs.statSync(filePath).isDirectory()) this._loadCommands(file);
				else this._loadCommand(filePath);
			} catch (error) {
				console.error(`Error loading ${directory}${file}:\n`, error);
			}
		})
	}

	_loadCommand(commandPath, reload) {
		if (!commandPath.endsWith('.js')) return;

		if (reload) delete require.cache[require.resolve(commandPath)];
		const file = require(commandPath);

		const command = path.basename(commandPath, '.js');
		this.commands.set(command, file);

		if (!reload) console.log('\t', command);
	}

	_loadEvents() {
		const files = fs.readdirSync(EVENT_PATH);

		files.forEach(fileName => {
			const filePath = path.join(EVENT_PATH, fileName);
			const eventName = path.basename(fileName, '.js');
			const event = require(filePath);

			this.on(eventName, event.bind(null, this));
			console.log('\t', eventName);
		});
	}
}

module.exports = BoysClient;