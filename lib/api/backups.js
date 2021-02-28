const backups = function (client) {
  this.client = client
}

backups.prototype.list = function (site_id, args) {
  const endpoint = `api/v1/sites/${site_id}/backups`
  args = Object.assign(
    {
      limit: this.client.LIMIT
    },
    args
  )

  return this.client.getEndpoint(endpoint, args)
}

backups.prototype.get = function (site_id, backup_id, args) {
  const endpoint = `api/v1/sites/${site_id}/backups/${backup_id}/url`
  return this.client.getEndpoint(endpoint, args)
}

backups.prototype.create = function(site_id, args) {
  const endpoint = `api/v1/sites/${site_id}/backup`
  return this.client.postEndpoint(endpoint, args)
}

backups.prototype.delete = function (site_id, backup_id, args) {
  const endpoint = `api/v1/sites/${site_id}/backups/${backup_id}`
  return this.client.deleteEndpoint(endpoint, args)
}

module.exports = backups
