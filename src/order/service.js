'use strict'

const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')
const getListUseCase = require('./usecase/getList') 
const tracer = require('../../utils/tracer')

const Service = (repository) => {

    const getList = getListUseCase(repository)

    return {
        list: async (call, cb) => {
            const parentSpan = tracer.extract(FORMAT_HTTP_HEADERS, JSON.parse(call.metadata.get('processId')))
            const serviceListOrderSpan = tracer.startSpan('order-list', { childOf: parentSpan })
            
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
                serviceListOrderSpan.setTag(Tags.ERROR, true).log({ error: e.message, req: call.request })
                cb(e)
            } finally {
                serviceListOrderSpan.finish()
            }
        },
    }
}

module.exports = Service
