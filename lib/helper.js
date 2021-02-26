const Api = require('./api.js')

const helper = function (client) {
  this.client = client

  this.api = new Api(client)
}

helper.prototype.getAllSites = async function() {
  const response = await this.api.sites.get({ limit: this.client.PER_PAGE })
  let sites = [...response.sites]

  if (response.count > this.client.PER_PAGE) {
      let promises = [];
      for (let page = 2; page <= Math.ceil(response.count / this.client.PER_PAGE); page++) {
        promises.push(this.api.sites.get({ limit: this.client.PER_PAGE, page: page }))
      }

      await Promise.all(promises).then(responses => {
        responses.forEach(response => {
          sites.push([...response.sites])
        });
      })
    }

  return sites
}

module.exports = helper
