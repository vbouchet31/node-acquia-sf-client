const sites = function (client) {
  this.client = client
}

sites.prototype.get = function (args) {
  const endpoint = 'api/v1/sites'
  args = Object.assign(
    {
      limit: this.client.LIMIT
    },
    args
  )

  return this.client.getEndpoint(endpoint, args)
}

module.exports = sites
