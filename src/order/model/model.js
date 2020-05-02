'use strict'

const Model = (db) => ({
    orderList: async(userId, orderType, page, size) => {
        const limit = page * size;
        const offset = limit - size;

        const receivedCondition = `
            status = 3 AND
            processedDate IS NOT NULL AND 
            shipmentDate IS NOT NULL AND 
            receivedDate IS NOT NULL AND
            isRefund = 0 AND
            isReturn = 0
        `

        const sentCondition = `
            status = 3 AND
            processedDate IS NOT NULL AND 
            shipmentDate IS NOT NULL AND
            receivedDate IS NULL AND
            isRefund = 0 AND
            isReturn = 0
        `

        const processedCondition = `
            status = 3 AND
            processedDate IS NOT NULL AND 
            shipmentDate IS NULL AND
            receivedDate IS NULL AND
            isRefund = 0 AND
            isReturn = 0
        `

        const paidCondition = `
            status = 3 AND
            processedDate IS NULL AND 
            shipmentDate IS NULL AND
            receivedDate IS NULL AND
            isRefund = 0 AND
            isReturn = 0
        `

        const pendingCondition = `
            status = 2
        `

        const refundCondition = `
            isRefund = 1
        `

        const returnCondition = `
            isReturn = 1
        `

        const expiredCondition = `
            status = 99
        `

        const orderTypes = {
            'received': receivedCondition,
            'sent': sentCondition,
            'processed': processedCondition,
            'paid': paidCondition,
            'pending': pendingCondition,
            'return': returnCondition,
            'refund': refundCondition,
            'expired': expiredCondition
        }

        const filterByType = orderTypes[orderType] || orderTypes['paid']

        const q = `
            SELECT 
                id, 
                orderCode, 
                totalPaymentCourier,
                checkoutDate,
                totalQuantity,
                CASE
                    WHEN ${pendingCondition} THEN 'Belum Bayar'
                    WHEN ${receivedCondition} THEN 'Diterima'
                    WHEN ${sentCondition} THEN 'Dikirim'
                    WHEN ${processedCondition} THEN 'Diproses'
                    WHEN ${paidCondition} THEN 'Dibayar'
                    WHEN ${refundCondition} THEN 'Dibatalkan'
                    WHEN ${returnCondition} THEN 'Dikembalikan'
                    WHEN ${expiredCondition} THEN 'Expired'
                    ELSE 'Dibayar'
                END AS transactionStatusLabel
            FROM evm.order 
            WHERE 
                userId = ? AND
                ${filterByType}            
            LIMIT ? OFFSET ?`

        let [list] = await db.raw(q, [userId, limit, offset])
        list = JSON.parse(JSON.stringify(list))
        
        return list
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
