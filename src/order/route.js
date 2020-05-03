'use strict'

const Service = require('./service')
const Repository = require('./repository')

const Route = () => {

    const OrderRepo = Repository()
    const OrderService = Service(OrderRepo)

    return OrderService
}

module.exports = Route