'use strict'

const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')
const tracer = require('../../utils/tracer')

// Usecase
const getListUseCase = require('./usecase/getList') 
const getDataUseCase = require('./usecase/getData') 

const Service = (repository) => {

    const getList = getListUseCase(repository)
    const getData = getDataUseCase(repository)

    return {
        list: async (call, cb) => {
            const parentSpan = tracer.extract(FORMAT_HTTP_HEADERS, JSON.parse(call.metadata.get('processId')))
            const methodSpan = tracer.startSpan('order-list', { childOf: parentSpan })
            
            try {
                const { 
                    userId, 
                    orderType, 
                    page, 
                    size 
                } = call.request
                const list = await getList(userId, orderType, page, size)
    
                cb(null, { orders: list })
            } catch (e) {
                methodSpan
                    .setTag(Tags.ERROR, true)
                    .log({ error: e.message, req: call.request })
                    
                cb(e)
            } finally {
                methodSpan.finish()
            }
        },

        data: async (call, cb) => {
            const parentSpan = tracer.extract(FORMAT_HTTP_HEADERS, JSON.parse(call.metadata.get('processId')))
            const methodSpan = tracer.startSpan('order-data', { childOf: parentSpan })
            
            try {
                const { 
                    userId,
                    orderCode
                } = call.request
                const data = await getData(userId, orderCode)
    
                cb(null, { order: data })
            } catch (e) {
                methodSpan
                    .setTag(Tags.ERROR, true)
                    .log({ error: e.message, req: call.request })

                cb(e)
            } finally {
                methodSpan.finish()
            }
        },
    }
}

module.exports = Service
