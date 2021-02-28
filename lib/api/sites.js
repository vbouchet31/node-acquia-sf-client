const sites = function (client) {
  this.client = client
}

sites.prototype.list = function (args) {
  const endpoint = 'api/v1/sites'
  args = Object.assign(
    {
      limit: this.client.LIMIT
    },
    args
  )

  return this.client.getEndpoint(endpoint, args)
}

sites.prototype.get = function (site_id) {
  const endpoint = `api/v1/sites/${site_id}`
  return this.client.getEndpoint(endpoint)
}

sites.prototype.create = function(args) {
  const endpoint = 'api/v1/sites'
  return this.client.postEndpoint(endpoint, args)
}

sites.prototype.delete = function (site_id) {
  const endpoint = `api/v1/sites/${site_id}`
  return this.client.deleteEndpoint(endpoint)
}

sites.prototype.duplicate = function (site_id, args) {
  const endpoint = `api/v1/sites/${site_id}/duplicate`
  return this.client.postEndpoint(endpoint, args)
}

module.exports = sites
