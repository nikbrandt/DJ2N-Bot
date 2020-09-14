const BoysClient = require('./struct/BoysClient');

const client = new BoysClient();

client.login(client.config.token);