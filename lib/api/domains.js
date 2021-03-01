const domains = function (client) {
  this.client = client
}

domains.prototype.get = function (node_id) {
  const endpoint = `api/v1/domains/${node_id}`
  return this.client.getEndpoint(endpoint)
}

domains.prototype.status = function (domain_name) {
  const endpoint = `api/v1/domains/status/${domain_name}`
  return this.client.getEndpoint(endpoint)
}

domains.prototype.add = function (site_id, args) {
  const endpoint = `api/v1/domains/${site_id}/add`
  return this.client.postEndpoint(endpoint, args)
}

domains.prototype.remove = function (site_id, args) {
  const endpoint = `api/v1/domains/${site_id}/remove`
  return this.client.postEndpoint(endpoint, args)
}

module.exports = domains
