const fetch = require('node-fetch')
const querystring = require('querystring')

const HttpClient = function (options) {
  if (!options.subscription) {
    throw new Error('Subscription variable is mandatory.')
  }

  this.baseUrl = `https://www.${(options.env ? options.env + '-' : '')}${options.subscription}.acsitefactory.com/`
  this.options = {
    headers: {
      'User-Agent': 'node-acquia-sf',
      'Authorization': `Basic ${Buffer.from(options.username + ':' + options.token, 'utf-8').toString('base64')}`,
      'Content-type': 'application/json'
    }
  }
  this.PER_PAGE = options.per_page || 100
}

HttpClient.prototype.getEndpoint = function (endpoint, args) {
  if (!args) {
    args = {}
  }

  endpoint += args ? '?' + querystring.stringify(args) : ''

  this.options.method = 'get'

  return this._requestHelper(endpoint)
}

HttpClient.prototype._requestHelper = async function(endpoint) {
  let json = {}
  try {
    const response = await fetch(this.baseUrl + endpoint, this.options)
    json = await response.json()
  } catch (error) {
    throw new Error(error)
  }

  return json
}

module.exports = HttpClient
