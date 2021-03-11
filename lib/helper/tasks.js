const iterator = require('batch-iterator');

// A local copy of fetched tasks so it can be checke before fetching more tasks
// from the API. Currently used in getTask(task_id) as it is invoked in a while
// loop in getParentTasks(task_id) and so the same API call may be issued
// otherwise.
let _tasks = []

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

// Order of the tasks in response is not reliable. Task 1246 may be before task
// 1251. We can't simply fetch tasks until the condition does not apply anymore
// and stop as some following tasks may apply as well. For this, we keep looping
// over 5 additional pages after the latest applicable task is found to look for
// more tasks.
tasks.prototype.getAllTasksSince = async function (attributeName, value, condition = '==') {
  // Limit the attributes which we deal with. This list is arbitrary based on
  // experience, other attributes may work ... or not. Test it.
  if (!['id', 'added', 'parent', 'started', 'completed'].includes(attributeName)) {
    return []
  }

  let tasks = []
  let page = 0
  do {
    pageTasks = await this.api.tasks.list({ page: page })

    pushed = false
    for (const task of pageTasks) {
      // Evaluate the condition so we can stop looping the pages if met. It is
      // verbose but the safer way to avoid using eval().
      if ((condition == '==' && task[attributeName] == value)
        || (condition == '>' && task[attributeName] > value)
        || (condition == '>=' && task[attributeName] >= value)
        || (condition == '<' && task[attributeName] < value)
        || (condition == '<=' && task[attributeName] <= value)) {
        tasks.push(task)
        pushed = true
      }
    }

    // If we have not found any matching task on this page, we decrease the
    // counter. Otherwise, we reset it to keep looping.
    if (!pushed) {
      max--
    }
    else {
      max = this.client.MAX_PAGES
    }

    page++
  } while (max > 0)

  return tasks
}

tasks.prototype.getTask = async function (task_id) {
  // First try to get task from the local cache.
  for (task of _tasks) {
    if (task.id == task_id) {
      return task
    }
  }

  page = 0
  do {
    let tasks = await this.api.tasks.list({ page: page })
    _tasks = [..._tasks, ...tasks]

    for (task of tasks) {
      if (task.id == task_id) {
        return task
      }
    }

    page += 1
  } while(this.client.MAX_PAGES)

  return {}
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

tasks.prototype.getParentTasks = async function (task_id) {
  let task = await this.getTask(task_id)

  let parents = []

  while (task.parent !== '0') {
    task = await this.getTask(task.parent)
    parents.push(task)
  }

  return parents
}

module.exports = tasks
