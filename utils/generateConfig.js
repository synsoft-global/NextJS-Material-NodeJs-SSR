const fs = require('fs')
const path = require('path')
const developmentConfig = require('../config/dev.json')
const productionConfig = require('../config/prod.json')
const stagingConfig = require('../config/staging.json')
const environment = process.env.NEXT_PUBLIC_APP_ENV || 'development'


let config = (() => {
  switch (environment) {
    case 'development': return developmentConfig
    case 'staging': return stagingConfig
    case 'production': return productionConfig
    default: return developmentConfig
  }
})()


const configFilePath = path.join(__dirname, '../config/config.json');
fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))


console.log(
  `\x1b[32m-------------------------------
    ${environment.toUpperCase()} Environment
-------------------------------\x1b[0m`
)

