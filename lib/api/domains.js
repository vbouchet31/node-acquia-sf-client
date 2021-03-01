const domains = function (client) {
  this.client = client
}

domains.prototype.get = function (node_id) {
  const endpoint = `api/v1/domains/${node_id}`
  return this.client.getEndpoint(endpoint)
}

module.exports = domains
