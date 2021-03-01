const tasks = function (client) {
  this.client = client
}

tasks.prototype.list = function (args) {
  const endpoint = 'api/v1/tasks'
  args = Object.assign(
    {
      limit: this.client.LIMIT
    },
    args
  )

  return this.client.getEndpoint(endpoint, args)
}

tasks.prototype.get = function (task_id, args) {
  const endpoint = `api/v1/tasks/${task_id}/logs`
  return this.client.getEndpoint(endpoint, args)
}

tasks.prototype.delete = function (task_id, args) {
  const endpoint = `api/v1/tasks/${task_id}`
  return this.client.deleteEndpoint(endpoint, args)
}

tasks.prototype.terminate = function (task_id, args) {
  const endpoint = `api/v1/tasks/${task_id}`
  return this.client.putEndpoint(endpoint, args)
}

module.exports = tasks
