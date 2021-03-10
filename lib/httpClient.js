const fetch = require('node-fetch')
const querystring = require('querystring')

const HttpClient = function (options) {
  if (!options.subscription) {
    throw new Error('Subscription variable is mandatory.')
  }
  if (!options.username) {
    throw new Error('Username variable is mandatory.')
  }
  if (!options.token) {
    throw new Error('Token variable is mandatory.')
  }

  this.baseUrl = `https://www.${(options.env ? options.env + '-' : '')}${options.subscription}.acsitefactory.com/`
  this.options = {
    headers: {
      'User-Agent': 'node-acquia-sf-client',
      'Authorization': `Basic ${Buffer.from(options.username + ':' + options.token, 'utf-8').toString('base64')}`,
      'Content-type': 'application/json'
    }
  }
  this.LIMIT = options.limit || 100
  this.BATCH_SIZE = options.batch_size || 5
  this.MAX_PAGES = options.max_pages || 100
  this.AUTO_INCREMENT_STEP = 5
}

HttpClient.prototype.getEndpoint = function (endpoint, args) {
  endpoint += args ? '?' + querystring.stringify(args) : ''

  this.options.method = 'get'

  return this._requestHelper(endpoint)
}

HttpClient.prototype.putEndpoint = function (endpoint, args) {
  this.options.method = 'put'
  this.options.body = JSON.stringify(args)

  return this._requestHelper(endpoint)
}

HttpClient.prototype.postEndpoint = function (endpoint, args) {
  this.options.method = 'post'
  this.options.body = JSON.stringify(args)

  return this._requestHelper(endpoint)
}

HttpClient.prototype.deleteEndpoint = function (endpoint, args = {}) {
  this.options.method = 'delete'
  if (args) {
    this.options.body = JSON.stringify(args)
  }

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
