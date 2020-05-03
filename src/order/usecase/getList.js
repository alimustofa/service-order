'use strict'

module.exports = (repository) => async (userId, orderType, page, size) => {
    const response = await repository.orderList(userId, orderType, page, size)
    
    return response
}
