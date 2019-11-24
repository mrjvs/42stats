const Config = require('./config.json');

module.exports = {
	cacheFile: 'coalition-cache.json',
	campus: {
		name: 'Codam',
		id: '14',
	},
	cursus: '42cursus',
	...Config,
};
