'use strict'

const Service = require('./service')
const Repository = require('./repository')
const Controller = require('./controller')

const Route = () => {

    const OrderRepo = Repository()
    const OrderService = Service(OrderRepo)
    const OrderController = Controller(OrderService)

    return OrderController
}

module.exports = Route