'use strict'

const Controller = (service) => {
    const { list } = service

    return {
        list,
    }
}
    

module.exports = Controller