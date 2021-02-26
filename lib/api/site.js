const site = function(client) {
  this.client = client
}

site.prototype.get = function (site_id) {
  const endpoint = `api/v1/sites/${site_id}`
  return this.client.getEndpoint(endpoint)
}

module.exports = site
