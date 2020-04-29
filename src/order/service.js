'use strict'

const getListUseCase = require('./usecase/getList') 

const Service = (repository) => {

    const getList = getListUseCase(repository)

    return {
        list: async (call, cb) => {
            const { page, size } = call.request
            const list = await getList(page, size)

            cb(null, { orders: list })
        },
    }
}

module.exports = Service
