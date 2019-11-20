const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const { client_id, client_secret } = require('../config-defaults.js');

class Auth {
	constructor(id, secret) {
		this.client_id = id;
		this.client_secret = secret;
		this.token = "";
		this.http = rateLimit( axios.create(), {
			maxRequests: 1200,
			perMilliseconds: 3600000,
			maxRPS: 2,
		});
	}

	async init() {
		const resAuth = await this.http.post('https://api.intra.42.fr/oauth/token', {
			grant_type: 'client_credentials',
			client_id: this.client_id,
			client_secret: this.client_secret,
		});
		this.token = resAuth.data.access_token;
	}

	getToken() {
		// add expiry check
		return this.token;
	}
}

module.exports = new Auth(client_id, client_secret);
