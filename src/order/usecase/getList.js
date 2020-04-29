'use strict'

module.exports = (repository) => async (page, size) => {
    const response = await repository.list(page, size)

    const orders = response.map(async order => {
        order.orderReceipts = await repository.receiptList(order.id)

        const receipts = order.orderReceipts.map(async receipt => {
            receipt.orderDetails = await repository.detailList(receipt.id)

            return receipt
        })

        await Promise.all(receipts)

        return order
    })

    await Promise.all(orders)

    console.log(orders)
    return response
}
