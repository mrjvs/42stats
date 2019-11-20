const Auth = require('./classes/auth.js');
const Project = require('./classes/project.js');
const { campus, projectList } = require('./config-defaults.js');

async function start() {
	const projects = [];

	// initialise authentication
	await Auth.init();

	// print every project
	for (let i in projectList) {
		let temp = new Project(campus, projectList[i]);
		await temp.printProject();
		console.log("");
		projects.push(temp);
	}
}

start();
