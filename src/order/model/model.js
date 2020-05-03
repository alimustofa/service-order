'use strict'

const { orderTypeCondition } = require('./condition')

const Model = (db) => ({
    orderList: async(userId, orderType, page, size) => {
        const limit = page * size;
        const offset = limit - size;

        const orderTypes = orderTypeCondition()
        const filterByType = orderTypes[orderType] || orderTypes['paid']

        const q = `
            SELECT 
                id, 
                orderCode, 
                totalPaymentCourier,
                checkoutDate,
                totalQuantity,
                CASE
                    WHEN ${orderTypes.pending.condition} THEN '${orderTypes.pending.label}'
                    WHEN ${orderTypes.received.condition} THEN '${orderTypes.received.label}'
                    WHEN ${orderTypes.sent.condition} THEN '${orderTypes.sent.label}'
                    WHEN ${orderTypes.processed.condition} THEN '${orderTypes.processed.label}'
                    WHEN ${orderTypes.paid.condition} THEN '${orderTypes.paid.label}'
                    WHEN ${orderTypes.refund.condition} THEN '${orderTypes.refund.label}'
                    WHEN ${orderTypes.return.condition} THEN '${orderTypes.return.label}'
                    WHEN ${orderTypes.expired.condition} THEN '${orderTypes.expired.label}'
                END AS transactionStatusLabel
            FROM evm.order 
            WHERE 
                userId = ? AND
                ${filterByType.condition}
            ORDER BY paymentDate, id DESC         
            LIMIT ? OFFSET ?`

        let [list] = await db.raw(q, [userId, limit, offset])
        list = JSON.parse(JSON.stringify(list))
        
        return list
    },

    orderData: async(userId, orderCode) => {
        const orderTypes = orderTypeCondition()

        const q = `
            SELECT 
                id, 
                orderCode, 
                totalPaymentCourier,
                checkoutDate,
                totalQuantity,
                CASE
                    WHEN ${orderTypes.pending.condition} THEN '${orderTypes.pending.label}'
                    WHEN ${orderTypes.received.condition} THEN '${orderTypes.received.label}'
                    WHEN ${orderTypes.sent.condition} THEN '${orderTypes.sent.label}'
                    WHEN ${orderTypes.processed.condition} THEN '${orderTypes.processed.label}'
                    WHEN ${orderTypes.paid.condition} THEN '${orderTypes.paid.label}'
                    WHEN ${orderTypes.refund.condition} THEN '${orderTypes.refund.label}'
                    WHEN ${orderTypes.return.condition} THEN '${orderTypes.return.label}'
                    WHEN ${orderTypes.expired.condition} THEN '${orderTypes.expired.label}'
                END AS transactionStatusLabel
            FROM evm.order 
            WHERE 
                userId = ? AND
                orderCode = ?`

        let [data] = await db.raw(q, [userId, orderCode])
        data = JSON.parse(JSON.stringify(data))
        
        return data[0]
    },

    receiptList: async(orderId) => {
        const q = `
            SELECT
                id, orderReceiptCode
            FROM evm.order_receipt WHERE orderId = ?`
        let [list] = await db.raw(q, [orderId])
        list = JSON.parse(JSON.stringify(list))
        
        return list
    },

    detailList: async(orderReceiptId) => {
        const q = `
            select 
                id, orderDetailCode
            from evm.order_detail where orderReceiptId = ?`
        let [list] = await db.raw(q, [orderReceiptId])
        list = JSON.parse(JSON.stringify(list))
        
        return list
    },
})


module.exports = Model
