'use strict'

const generateResp = (status, code, message, data) => {
    return {
        status,
        code,
        message,
        data,
    }
}

module.exports = generateResp