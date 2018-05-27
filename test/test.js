process.env.NODE_ENV = 'test'

import Item from '../models/itemModel'
let mongoose = require('mongoose')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

var timestamp // This will store the timestamp at which first value is added

describe('Items', () => {
  before((done) => {
    let item = new Item()
    item.key = 'mykey'
    item.value = 'value1'
    item.save()
    timestamp = item.timestamp
    done()
  })
  after((done) => {
    Item.remove({}, (err) => {
      done()
    })
  })

  describe('/GET', () => {
    it('it should GET value of mykey', (done) => {
      chai.request(server)
        .get('/object/mykey')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.value.should.be.eql('value1')
          done()
        })
    })
    describe('/GET with conditions', () => {
      before((done) => {
        let item = new Item()
        item.key = 'mykey'
        item.value = 'value2'
        item.save()
        done()
      })
      it('it should GET latest value of mykey', (done) => {
        chai.request(server)
          .get('/object/mykey')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.value.should.be.eql('value2')
            done()
          })
      })
      it('it should GET latest value of mykey based on timestamp', (done) => {
        chai.request(server)
          .get('/object/mykey?timestamp=' + String(timestamp))
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.value.should.be.eql('value1')
            done()
          })
      })
    })
  })

  describe('/POST', () => {
    it('it should POST and receive value of mykey', (done) => {
      chai.request(server)
        .post('/object')
        .send({ 'mykey': 'value3' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.value.should.be.eql('value3')
          done()
        })
    })
  })
})
