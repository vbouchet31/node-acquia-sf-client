const Api = require('./api.js')
const Sites = require('./helper/sites.js')

const helper = function (client) {
  this.client = client

  this.api = new Api(client)

  this.sites = new Sites(this.client, this.api)
}

module.exports = helper
