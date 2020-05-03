'use strict'

const { getEvmDbMaster } = require('../../utils/db')
const Model = require('./model/model')

const Repository = () => {
    const evmDb = getEvmDbMaster()
    const model = Model(evmDb)

    return {
        orderList: async(userId, orderType, page, size) => {
            const list = model.orderList(userId, orderType, page, size)
            
            return list
        },

        orderData: async(userId, orderCode) => {
            const list = model.orderData(userId, orderCode)
            
            return list
        },

        receiptList: async(orderId) => {
            const list = model.receiptList(orderId)
            
            return list
        },

        detailList: async(orderReceiptId) => {
            const list = model.detailList(orderReceiptId)
            
            return list
        },
    }
}

module.exports = Repository
