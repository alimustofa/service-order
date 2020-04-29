'use strict'

let _evmDbMaster

const initDb = async(cb) => {
    if (!_evmDbMaster) {
        try {
          _evmDbMaster = require('knex')({
            client: 'mysql',
            connection: {
              host: process.env.DB_EVM_HOST,
              user: process.env.DB_EVM_USER,
              password: process.env.DB_EVM_PASS,
              database: process.env.DB_EVM_NAME
            },
          })
        } catch (e) {
          cb(e, false)
        }
  
        return cb(null, true)
    }
}

const getEvmDbMaster = () => {
    return _evmDbMaster
}

module.exports = {
    initDb,
    getEvmDbMaster
}