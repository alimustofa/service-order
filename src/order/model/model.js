'use strict'

const Model = (db) => ({
    list: async(page, size) => {
        const limit = page * size;
        const offset = limit - size;

        const q = `
            select 
                id, orderCode, totalPaymentCourier
            from evm.order limit ? offset ?`
        let [list] = await db.raw(q, [limit, offset])
        list = JSON.parse(JSON.stringify(list))
        
        return list
    },

    receiptList: async(orderId) => {
        const q = `
            select 
                id, orderReceiptCode
            from evm.order_receipt where orderId = ?`
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
