const site = function(client) {
  this.client = client
}

site.prototype.get = function (site_id) {
  const endpoint = `api/v1/sites/${site_id}`
  return this.client.getEndpoint(endpoint)
}

site.prototype.create = function(body) {
  const endpoint = 'api/v1/sites'
  return this.client.postEndpoint(endpoint, body)
}

module.exports = site
