'use strict'

const initTracerFromEnv = require('jaeger-client').initTracerFromEnv
const configs = {
    serviceName: process.env.SERVICE_NAME
}
const opts = {
    logger: console,
    tags: {
        'project.name': process.env.SERVICE_NAME,
    }
}

module.exports = initTracerFromEnv(configs, opts)