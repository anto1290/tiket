const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tiketSechma = new Schema({
  title: {
    type: String,
    minLength: [5, 'title must be more than 5 characters'],
    maxLength: [100, 'title must be less than 100 characters']
  },
  issued_by: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  numberTiket: {
    type: String,
    maxLength: [25, 'number tiket must be less than 25 characters']
  },
  level: {
    type: String,
    enum: ['low','medium','high'],
    default: 'low'
  },
  status: {
    type: String,
    enum: ['Open', 'Reply', 'Close'],
    default: 'Open'
  }
}, {
  timestamps: true,
  deletedAt: {
    type: Date,
    default: null
  }
})

const Tiket = mongoose.model('Tiket',tiketSechma)
module.exports = Tiket
