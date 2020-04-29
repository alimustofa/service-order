'use strict'

require('dotenv').config()

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');

const port = process.env.PORT || 9001

// utils
const { initDb } = require('./utils/db')
// routes
const orderRoutes = require('./src/order/route')

const protoOpts = {
    keepCase: true,
    defaults: true,
    oneofs: true,
    arrays: true,
}
const packageDefinition = protoLoader.loadSync('src/order/proto/order.proto', protoOpts);
const orderProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server()

initDb(async err => {
    if (err) throw err
    // order route
    const orderRoute = orderRoutes()

    server.addService(orderProto.OrderService.service, orderRoute)

    server.bind(`127.0.0.1:${port}`,  grpc.ServerCredentials.createInsecure())
    console.log(`Server running at http://127.0.0.1:${port}`)
    
    server.start()
})