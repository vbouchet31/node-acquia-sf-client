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

const sites = await sfClient.api.sites.get({ limit: 10, page: 2 })

const site = await sfClient.api.site.get(111)

const sites = await sfClient.helper.getAllSites()
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

** Sites
GET `api/v1/sites/${site_id}``
GET `api/v1/sites`

** Domains
GET `api/v1/domains/${node_id}`

** Tasks
GET `api/v1/tasks`
