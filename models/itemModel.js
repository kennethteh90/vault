import mongoose from 'mongoose'
const Schema = mongoose.Schema
const itemModel = new Schema({
  // _id: Number, select: false, // alternative solution to removing _id by default
  key: String,
  value: String,
  timestamp : { type : Number, default: Date.now }
})
export default mongoose.model('items', itemModel)
