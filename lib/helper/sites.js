const iterator = require('batch-iterator');

const sites = function (client, api) {
  this.client = client
  this.api = api
}

sites.prototype.listAll = async function() {
  const response = await this.api.sites.list()
  let sites = [...response.sites]

  // If we don't get all the sites on the first page, we will calculate the
  // number of pages to fetch from the count argument in the response and fetch
  // all the pages in batches.
  if (response.count > this.client.LIMIT) {
    let maxPage = Math.ceil(response.count / this.client.LIMIT) - 1

    await iterator([...Array(maxPage).keys()], this.client.BATCH_SIZE, function(page, parent) {
      return parent.api.sites.list({ page: page + 2 })
    }, this).then(responses => {
      responses.forEach(response => {
        sites = [...sites, ...response.sites]
      })
    })
  }

  return sites
}

module.exports = sites
