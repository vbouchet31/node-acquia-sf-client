* WORK IN PROGRESS *

This module aims to be a wrapper around the ACSF API.

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

The module is composed of api.* methods which are simple wrapper around the
ACSF API's endpoint without any transformation.
Second part of the module is helper.* methods which utilities method which may
issue multiple API requests to get the required data and may transform the
response to ease the usage.
