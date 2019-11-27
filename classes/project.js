const chalk = require('chalk');
const Auth = require('./auth.js');
const Coalitions = require('./coalitions.js');

class Project {
	constructor(campus, project) {
		this.projectSlug = project;
		this.campus = campus;
	}

	async getProjectUsers() {
		let output = [];
		const url = `https://api.intra.42.fr/v2/projects/${this.projectSlug}/projects_users`
		const response = await Auth.http({
			method: 'get',
			url,
			params: {
				'filter[campus]': this.campus.id,
				'page[size]': '100',
			},
			headers: {
				'Authorization': 'Bearer ' + Auth.getToken(),
			}
		});
		output = output.concat(response.data);
		const pages = parseInt(response.headers["x-total"]);
		const amountpages = (Math.floor(pages / 100) + 1);
		for (let i = 1; i < amountpages; i++) {
			const res = await Auth.http({
				method: 'get',
				url,
				params: {
					'filter[campus]': this.campus.id,
					'page[size]': '100',
					'page[number]': i + 1,
				},
				headers: {
					'Authorization': 'Bearer ' + Auth.getToken(),
				}
			});
			output = output.concat(res.data);
		}
		return output;
	}

	async getProject() {
		const url = `https://api.intra.42.fr/v2/projects/${this.projectSlug}`
        const response = await Auth.http({
            method: 'get',
            url,
            headers: {
                'Authorization': 'Bearer ' + Auth.getToken(),
            }
		});
        return (response.data);
	}

	async printProjectUsers() {
		let out = await this.getProjectUsers();
		let maxlen = 0;
		let count = 0;
		out = out.filter((val) => {
			if (val['validated?'] === true)
			{
				if (val.user.login.length > maxlen)
					maxlen = val.user.login.length;
				return true;
			}
			return false;
		});
		out.sort((a, b) => {
			return new Date(a.marked_at) - new Date(b.marked_at);
		});
		out.forEach((val) => {
			count++;
			while (val.user.login.length < maxlen) {
				val.user.login += " ";
			}
		});
		if (out.length === 0)
			console.log(
				chalk.redBright("Couldn't find anyone who passsed ") +
				chalk.white(this.projectSlug) +
				chalk.redBright(" at ") +
				chalk.white(this.campus.name) +
				chalk.redBright("!")
			);
		else
		{
			for (let i in out) {
				let coalition = await Coalitions.getCoalitionFromUserId(out[i].user.id);
				const num = 1 + +i;
				console.log(
					chalk.gray(`${num < 10 ? "0" : ""}${num}. `) + 
					chalk.gray(`(${out[i].project.slug})`) +
					chalk.hex(coalition.color)(`[ ${out[i].user.login} ]`) +
					' final mark: ' +
					chalk.green(out[i].final_mark)
				);
			}
			console.log(
				chalk.gray("Found ") +
				chalk.white(count) +
				chalk.gray(count > 0 ? " people." : "person.")
			);
		}
	}

	async printProject() {
		const project = await this.getProject();
		const hasMoulinette = project.project_sessions[0].uploads.filter((val) => {
			return (val.name === 'Moulinette');
		}).length > 0;
		console.log(
			chalk.bold.white("Project ") +
			chalk.bold.greenBright(project.slug) +
			chalk.gray(":\nMoulinette: ") +
			chalk[(hasMoulinette ? 'redBright' : 'greenBright')](hasMoulinette ? 'Yes' : 'No') + "\n"
		);
	}
}

module.exports = Project;
