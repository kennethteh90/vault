import express from 'express'
import Item from '../models/itemModel'
const router = express.Router()

router
  .get('/:key', (req, res) => {
    const key = req.params.key
    if (req.query.timestamp) {
      // Gets latest object on or before timestamp
      Item
        .where('timestamp').lte(req.query.timestamp)
        .findOne({'key': key}, 'value -_id')
        .sort('-timestamp')
        .exec(function(err, data){
          res.json(data)
        })
    }
    else {
      // Gets latest object
      Item.findOne({'key': key}, 'value -_id')
        .sort('-timestamp')
        .exec(function(err, data){
          res.json(data)
        })
    }
  })
  .post('/', (req, res) => {
    const key = Object.keys(req.body)[0]
    let item = new Item()
    item.key = key
    item.value = req.body[key]
    item.save()
    // Hack to remove _id field from return
    item = item.toObject()
    delete item['_id']
    res.json(item)
  })
export default router
