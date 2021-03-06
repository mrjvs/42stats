const fs = require('fs');
const path = require('path');
const Auth = require('./auth.js');
const { cacheFile } = require('../config-defaults.js');

class CoalitionCache {
	constructor() {
		this.users = {};
		this.loadCache();
	}

	saveCoalition(userId, coalition) {
		this.users[userId] = coalition;
		this.saveCache();
	}

	async getCoalitionFromUserId(userId) {
		if (typeof this.users[userId] !== 'undefined')
			return this.users[userId];
		return await this.getCoalitionFromUserIdNetwork(userId);
	}

	async getCoalitionFromUserIdNetwork(userId) {
		const res = await Auth.http({
			method: 'get',
			url: `https://api.intra.42.fr/v2/users/${userId}/coalitions`,
			params: {
				'page[size]': '100',
			},
			headers: {
				'Authorization': 'Bearer ' + Auth.getToken(),
			}
		});
		if (res.data.length === 0)
		{
			res.data[0] = {
				id: 9999,
				name: 'UNDEFINED',
				color: '#FFFFFF',
				user_id: userId
			}
		}
		this.saveCoalition(userId, res.data[0]);
		return res.data[0];
	}

	saveCache() {
		fs.writeFileSync(path.join(__dirname, '../', cacheFile), JSON.stringify({
			users: this.users,
		}));
	}

	loadCache() {
		if (fs.existsSync(path.join(__dirname, '../', cacheFile)))
		{
			const fileContents = fs.readFileSync(path.join(__dirname, '../', cacheFile));
			const data = JSON.parse(fileContents);
			this.users = {
				...this.users,
				...data.users,
			};
		}
	}
}

module.exports = new CoalitionCache();
