**WORK IN PROGRESS**

Please check the supported endpoints.

PRs are welcome to enrich the list of supported endpoints.

# Example

```
const acsf = require('node-acquia-sf-client')

const sfClient = new acsf.Client({
  subscription: 'mycustomername',
  env: 'dev',
  username: 'my.username',
  token: 'mysecrettokenfromaccountsettingsapikey'  
})

const sites = await sfClient.api.sites.list({ limit: 10, page: 2 })

const site = await sfClient.api.sites.get(111)

const sites = await sfClient.helper.listAll()
```

# Usage

Client variables:
 - subscription
 - env (empty if production/live)
 - username
 - token
 - limit (number of items per page - default: 100)
 - batch_size (maximum number of concurrent API calls - default: 5)

# Supported API endpoints

The documentation of each endpoint is accessible at `htts://www.<subscription>.acsitefactory.com/api/v1`

## Sites
- client.api.sites.get GET `api/v1/sites/${site_id}`
- client.api.sites.list GET `api/v1/sites`
- client.api.sites.create POST `api/v1/sites`
- client.api.sites.delete DELETE `api/v1/sites/${site_id}`
- client.api.sites.duplicate POST `api/v1/sites/${site_id}/duplicate`
- client.api.sites.cacheClear POST `api/v1/sites/${site_id}/cache-clear`

## Backups
- client.api.backups.list GET `api/v1/sites/${site_id}/backups`
- client.api.backups.get GET `api/v1/sites/${site_id}/backups/${backup_id}/url`
- client.api.backups.create POST `api/v1/sites/${site_id}/backup`
- client.api.backups.delete DELETE `api/v1/sites/${site_id}/backups/${backup_id}`
- client.api.backups.restore POST `api/v1/sites/${site_id}/restore`

## Domains
- client.api.domains.get GET `api/v1/domains/${node_id}`
- client.api.domains.status GET `api/v1/domains/status/${domain_name}`
- client.api.domains.add POST `api/v1/domains/${site_id}/add`
- client.api.domains.remove POST `api/v1/domains/${site_id}/remove`

## Tasks
- client.api.tasks.list GET `api/v1/tasks`
- client.api.tasks.get GET `api/v1/tasks/${task_id}/logs`
- client.api.tasks.delete DELETE `api/v1/tasks/${task_id}`
- client.api.tasks.terminate PUT `api/v1/tasks/${task_id}`
- client.api.tasks.status GET `api/v1/wip/tasks/${task_id}/status`
- client.api.tasks.pause POST `api/v1/pause/${task_id}`
- client.api.tasks.pauseAll POST `api/v1/pause/${task_id}`

# Helpers

Few helper methods have been implemented.

## Sites
- client.helper.sites.listAll

## Tasks
- client.helper.tasks.getAllTasksSinceTask
- client.helper.tasks.getChildTasks
