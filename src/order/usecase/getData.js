'use strict'

const responseGen = require('../../../utils/responseGenerator')

module.exports = (repository) => async (userId, orderCode) => {
    const order = await repository.orderData(userId, orderCode)

    if (!order) {
        return responseGen(200, 'ORDER_NOT_FOUND', 'Order tidak ditemukan', null)
    }

    order.orderReceipts = await repository.receiptList(order.id)

    const receipts = order.orderReceipts.map(async receipt => {
        receipt.orderDetails = await repository.detailList(receipt.id)

        return receipt
    })

    await Promise.all(receipts)

    return responseGen(200, null, 'Order data', order)
}
