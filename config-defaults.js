const Config = require('./config.json');

module.exports = {
	cacheFile: 'coalition-cache.json',
	campus: {
		name: 'Codam',
		id: '14',
	},
	projectList: [
		'42cursus-libft',
	],
	...Config,
};
