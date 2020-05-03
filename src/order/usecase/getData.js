'use strict'

module.exports = (repository) => async (userId, orderCode) => {
    const order = await repository.orderData(userId, orderCode)
    
    order.orderReceipts = await repository.receiptList(order.id)

    const receipts = order.orderReceipts.map(async receipt => {
        receipt.orderDetails = await repository.detailList(receipt.id)

        return receipt
    })

    await Promise.all(receipts)

    return order
}
