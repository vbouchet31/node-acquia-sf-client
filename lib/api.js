const Domain = require('./api/domain')
const Site = require('./api/site')
const Sites = require('./api/sites')
const Tasks = require('./api/tasks')

const api = function (client) {
  this.client = client

  this.domain = new Domain(this.domain)
  this.site = new Site(this.client)
  this.sites = new Sites(this.client)
}

module.exports = api
