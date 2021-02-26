const domain = function (client) {
  this.client = client
}

domain.prototype.get = function (node_id) {
  const endpoint = `api/v1/domains/${node_id}`
  return this.client.getEndpoint(endpoint)
}

module.exports = domain
