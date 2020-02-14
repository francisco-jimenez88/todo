
const mocha = require('mocha')
const expect = require('chai').expect
const { app } = require('../index')

describe('Todo-test', ()=> {

    it('Should get "/" from app', ()=> {
        expect(app).to.exist
    })
})