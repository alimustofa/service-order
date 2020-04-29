'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const faker = require('faker')

const getListUsecase = require('./getList')

describe('[USECASE] getList', () => {
    let expectedRes = []
    const limit = 3

    before(() => {
        for (let i = 0; i < limit; i++) {
            const data = {
                id: faker.random.number(),
                name: faker.random.word()
            }
            expectedRes.push(data)
        }
    })

    it ("should return list of model", async() => {
        // Arrange
        const repoMock = {
            list: () => {}
        }

        const getList = getListUsecase(repoMock)

        const spyQuery = sinon
            .stub(repoMock, 'list')
            .resolves(expectedRes)

        // Act
        const result = await getList()

        // Assert
        expect(spyQuery.calledOnce).to.be.true
        expect(result).to.be.equal(expectedRes)
        expect(result[0]).to.have.keys(['id', 'name'])
    })
})