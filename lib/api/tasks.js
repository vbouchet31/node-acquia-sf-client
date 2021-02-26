const tasks = function (client) {
  this.client = client
}

tasks.prototype.get = function (args) {
  const endpoint = 'api/v1/tasks'
  args = Object.assign(
    {
      limit: this.client.LIMIT
    },
    args
  )

  return this.client.getEndpoint(endpoint, args)
}

module.exports = tasks
