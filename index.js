const Api = require('./lib/api')
const Helper = require('./lib/helper')
const HttpClient = require('./lib/httpClient')

let acsf = {}

acsf.Client = class {

  constructor(options) {
    this.options = options

    var httpClient = new HttpClient(this.options)

    this.api = new Api(httpClient)
    this.helper = new Helper(httpClient)
  }
}

module.exports = acsf
