const Domain = require('./api/domain')
const Sites = require('./api/sites')
const Tasks = require('./api/tasks')

const api = function (client) {
  this.client = client

  this.domain = new Domain(this.client)
  this.sites = new Sites(this.client)
  this.tasks = new Tasks(this.client)
}

module.exports = api
