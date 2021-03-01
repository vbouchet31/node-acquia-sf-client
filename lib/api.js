const Backups = require('./api/backups')
const Domains = require('./api/domains')
const Sites = require('./api/sites')
const Tasks = require('./api/tasks')

const api = function (client) {
  this.client = client

  this.backups = new Backups(this.client)
  this.domains = new Domains(this.client)
  this.sites = new Sites(this.client)
  this.tasks = new Tasks(this.client)
}

module.exports = api
