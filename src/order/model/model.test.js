'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

const ProductModelModel = require('../model/model')

describe('[MODEL] Model', () => {
    let dbMock
    let expectedKnexRes
    const page = 1
    const size = 3
    const expectedModels = []
    const expectedLimit = 3
    const expectedOffset = 0

    before(() => {
        dbMock = {
            raw: () => {}
        }

        expectedKnexRes = [expectedModels]
    })

    it ("should return list from correct query", async() => {
        // Arrange
        const model = ProductModelModel(dbMock)
        const q = `
            select 
                id, name
            from product_model limit ? offset ?`
        const queryRaw = sinon
            .stub(dbMock, 'raw')
            .withArgs(q, [expectedLimit, expectedOffset])
            .resolves(expectedKnexRes)

        // Act
        const list = await model.list(page, size)

        // Assert
        expect(queryRaw.calledOnce).to.be.true

        expect(expectedKnexRes).to.be.an('array')
        expect(expectedKnexRes).to.not.be.empty

        expect(list).to.be.an('array')
    })
})