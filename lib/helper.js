const Api = require('./api')
const Sites = require('./helper/sites')
const Tasks = require('./helper/tasks')

const helper = function (client) {
  this.client = client

  this.api = new Api(client)

  this.sites = new Sites(this.client, this.api)
  this.tasks = new Tasks(this.client, this.api)
}

module.exports = helper
