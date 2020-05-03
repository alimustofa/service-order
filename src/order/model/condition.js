'use strict'

const orderTypeCondition = () => {
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
        'received': {
            condition: receivedCondition,
            label: 'Diterima'
        },
        'sent': {
            condition: sentCondition,
            label: 'Dikirim',
        },
        'processed': {
            condition: processedCondition,
            label: 'Diproses',
        },
        'paid': {
            condition: paidCondition,
            label: 'Dibayar',
        },
        'pending': {
            condition: pendingCondition,
            label: 'Belum Dibayar',
        },
        'return': {
            condition: returnCondition,
            label: 'Dikembalikan',
        },
        'refund': {
            condition: refundCondition,
            label: 'Dibatalkan',
        },
        'expired': {
            condition: expiredCondition,
            label: 'Expired',
        }
    }

    return orderTypes
}

module.exports = {
    orderTypeCondition
}