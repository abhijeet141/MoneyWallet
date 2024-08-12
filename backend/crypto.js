const Hashing = require('crypto')

function Hash(param){
    return Hashing.createHash('sha256').update(param).digest('hex')
}

module.exports = Hash