const crypto = require('crypto')

function generateApiKey() {
  return crypto.randomBytes(16).toString('hex')
}

const apiKey = generateApiKey()
console.log('API Key:', apiKey)
