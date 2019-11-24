const Auth = require('./classes/auth.js');
const Project = require('./classes/project.js');
const Cursus = require('./classes/cursus.js');
const config = require('./config-defaults.js');
const { campus, cursus } = config;
let { projectList } = config;

async function start() {
	const projects = [];

	// initialise authentication
	await Auth.init();

	// get all projects
	if (!projectList) {
		const cursusClass = new Cursus(cursus);
		projectList = await cursusClass.getProjectList();
	}

	// print every project
	for (let i in projectList) {
		let temp = new Project(campus, projectList[i]);
		await temp.printProject();
		console.log("");
		projects.push(temp);
	}
}

start();
