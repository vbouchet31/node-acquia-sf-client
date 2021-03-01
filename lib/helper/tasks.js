const iterator = require('batch-iterator');

const tasks = function (client, api) {
  this.client = client
  this.api = api
}

tasks.prototype.status = {
  NOT_STARTED: '1',
  RESTARTED: '2',
  IN_PROGRESS: '4',
  WAITING: '8',
  COMPLETED: '16',
  ERROR: '32',
  KILLED: '64'
}

tasks.prototype.getAllTasksSinceTask = async function (task_id) {
  let tasks = await this.api.tasks.list()

  // If the most recent task has a task_id lower than the requested one, we can
  // stop here as we won't find the requested task.
  if (tasks && tasks[0].id < task_id) {
    return []
  }

  // Check if the requested task is part of the first page's response.
  let originalTaskFound = (tasks.filter(task => {
    return task.id == task_id
  }).length) ? true : false

  // If the requested task is not part of the response, we calculate the page
  // it is probably in based on the most recent task on first page's response,
  // the increment step and the number of per page (limit). We fetch all the
  // pages between 2 and the calculated page. Because it can be many pages, we
  // use batches.
  if (!originalTaskFound) {
    let maxPage = (Math.ceil(((tasks[0].id - task_id) / this.client.AUTO_INCREMENT_STEP) / this.client.LIMIT) - 1)

    await iterator([...Array(maxPage).keys()], this.client.BATCH_SIZE, function(page, parent) {
      return parent.api.tasks.list({ page: page+1 })
    }, this).then(responses => {
      responses.forEach(response => {
        tasks = [...tasks, ...response]
      })
    })
  }

  // The latest page's response may contains some task which are older (task id
  // is lower) than the requested one, we need to filter these out.
  return tasks.filter(task => {
    return task.id >= task_id
  })
}

tasks.prototype.getChildTasks = async function (task_id) {
  let tasks = await this.getAllTasksSinceTask(task_id)

  return this._getChildTasksRecursively(tasks, task_id)
}

tasks.prototype._getChildTasksRecursively = async function (tasks, task_id) {
  // Get the direct child tasks of the given task.
  let childTasks = tasks.filter(task => {
    return task.parent == task_id
  })

  // Recursively invoke to find the child tasks of the child tasks.
  childTasks.forEach(childTask => {
    this._getChildTasksRecursively(tasks, childTask.id).then(tasks => {
      tasks.forEach(task => {
        childTasks.push(task)
      })
    })
  })

  return childTasks
}

module.exports = tasks
