* WORK IN PROGRESS *

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

* Usage
 Client variables:
 - subscription
 - env (empty if production/live)
 - username
 - token
 - limit (number of items per page - default: 100)
 - batch_size (maximum number of concurrent API calls - default: 5)

* Supported API endpoints

The documentation of each endpoint is accessible at htts://www.<subscription>.acsitefactory.com/api/v1

** Sites
GET `api/v1/sites/${site_id}`
GET `api/v1/sites`
POST `api/v1/sites`
DELETE `api/v1/sites/${site_id}`
POST `api/v1/sites/${site_id}/duplicate`
POST `api/v1/sites/${site_id}/cache-clear`

** Backups
GET `api/v1/sites/${site_id}/backups`
GET `api/v1/sites/${site_id}/backups/${backup_id}/url`
POST `api/v1/sites/${site_id}/backup`
DELETE `api/v1/sites/${site_id}/backups/${backup_id}`
POST `api/v1/sites/${site_id}/restore`

** Domains
GET `api/v1/domains/${node_id}`

** Tasks
GET `api/v1/tasks`
