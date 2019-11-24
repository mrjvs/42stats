const chalk = require('chalk');
const Auth = require('./auth.js');

class Cursus {
    constructor(cursusSlug) {
        this.cursusSlug = cursusSlug;
    }

    async getProjectList() {
        const url = `https://api.intra.42.fr/v2/cursus/${this.cursusSlug}/projects`
        const response = await Auth.http({
            method: 'get',
            url,
            params: {
                'page[size]': '100',
            },
            headers: {
                'Authorization': 'Bearer ' + Auth.getToken(),
            }
        });
        return response.data.map(value => value.slug);
    }
}

module.exports = Cursus;
