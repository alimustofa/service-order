'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const faker = require('faker')

const ModelController = require('./controller')

describe('[CONT] /list', () => {
    let status
    let json
    let res

    beforeEach(() => {
        res = {
            json: () => {

            },
            status: function() {
                return this
            },
        }

        status = sinon.spy(res, 'status')
        json = sinon.spy(res, 'json')
    })

    it('should set page to default when req.query.page is not given', async () => {
        const size = 5
        const defaultPage = 1
        const serviceMock = {
            getList: () => {}
        }

        const req = {
            query: {
                size
            }
        }

        const spyService = sinon.spy(serviceMock, 'getList')

        await ModelController(serviceMock).list(req, res)

        expect(spyService.calledWith(defaultPage, size)).to.be.true
        expect(status.calledWith(200))
        expect(json.args[0][0]).to.have.keys(['status', 'code', 'message', 'data'])
        expect(json.args[0][0]['code']).to.be.null
    })
})