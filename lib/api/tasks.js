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

tasks.prototype.status = function (task_id, args) {
  const endpoint = `api/v1/wip/tasks/${task_id}/status`
  return this.client.getEndpoint(endpoint, args)
}

tasks.prototype.pause = function (task_id, args) {
  const endpoint = `api/v1/pause/${task_id}`
  return this.client.postEndpoint(endpoint, args)
}

tasks.prototype.pauseAll = function (args) {
  const endpoint = `api/v1/pause`
  return this.client.postEndpoint(endpoint, args)
}

module.exports = tasks
