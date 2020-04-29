'use strict'

const { getEvmDbMaster } = require('../../utils/db')
const Model = require('./model/model')

const Repository = () => {
    const evmDb = getEvmDbMaster()
    const model = Model(evmDb)

    return {
        list: async(page, size) => {
            const list = model.list(page, size)
            
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
