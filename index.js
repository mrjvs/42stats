const argv = require('argv');
const Auth = require('./classes/auth.js');
const Project = require('./classes/project.js');
const Cursus = require('./classes/cursus.js');
const config = require('./config-defaults.js');
const { campus, cursus } = config;
let { projectList } = config;

const args = argv.run();

async function start() {
	const projects = [];

	// initialise authentication
	await Auth.init();

	// handle get-project
	if (args.targets.length >= 2) {
		if (args.targets[0] === 'get-project')
		{
			let temp = new Project(campus, args.targets[1]);
			await temp.printProject();
			return;
		}
	}

	// get all projects
	if (!projectList) {
		const cursusClass = new Cursus(cursus);
		projectList = await cursusClass.getProjectList();
	}

	// print every project
	for (let i in projectList) {
		let temp = new Project(campus, projectList[i]);
		await temp.printProjectUsers();
		console.log("");
		projects.push(temp);
	}
}

start();
