'use strict'

const responseGen = require('../../../utils/responseGenerator')

module.exports = (repository) => async (userId, orderType, page, size) => {
    const response = await repository.orderList(userId, orderType, page, size)
    
    return responseGen(200, null, 'Order data', response)
}
