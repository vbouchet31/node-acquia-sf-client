const Api = require('./lib/api')
const Helper = require('./lib/helper')
const HttpClient = require('./lib/httpClient')

const acsf = {}

acsf.Client = class {

  constructor(options) {
    this.options = options

    const httpClient = new HttpClient(this.options)

    this.api = new Api(httpClient)
    this.helper = new Helper(httpClient)
  }
}

module.exports = acsf
