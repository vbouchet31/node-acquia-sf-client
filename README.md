**WORK IN PROGRESS**

This module aims to be a wrapper around the ACSF API. It is composed of api.*
methods which are simple wrapper around the ACSF API's endpoint without any
transformation.
Second part of the module is helper.* methods which utilities method which may
issue multiple API requests to get the required data and may transform the
response to ease the usage.

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
- client.sites.get GET `api/v1/sites/${site_id}`
- client.sites.list GET `api/v1/sites`
- client.sites.create POST `api/v1/sites`
- client.sites.delete DELETE `api/v1/sites/${site_id}`
- client.sites.duplicate POST `api/v1/sites/${site_id}/duplicate`
- client.sites.cacheClear POST `api/v1/sites/${site_id}/cache-clear`

## Backups
- client.backups.list GET `api/v1/sites/${site_id}/backups`
- client.backups.get GET `api/v1/sites/${site_id}/backups/${backup_id}/url`
- client.backups.create POST `api/v1/sites/${site_id}/backup`
- client.backups.delete DELETE `api/v1/sites/${site_id}/backups/${backup_id}`
- client.backups.restore POST `api/v1/sites/${site_id}/restore`

## Domains
- client.domains.get GET `api/v1/domains/${node_id}`
- client.domains.status GET `api/v1/domains/status/${domain_name}`
- client.domains.add POST `api/v1/domains/${site_id}/add`
- client.domains.remove POST `api/v1/domains/${site_id}/remove`

## Tasks
- client.tasks.list GET `api/v1/tasks`
- client.tasks.get GET `api/v1/tasks/${task_id}/logs`
- client.tasks.delete DELETE `api/v1/tasks/${task_id}`
- client.tasks.terminate PUT `api/v1/tasks/${task_id}`
- client.tasks.status GET `api/v1/wip/tasks/${task_id}/status`
- client.tasks.pause POST `api/v1/pause/${task_id}`
- client.tasks.pauseAll POST `api/v1/pause/${task_id}`
