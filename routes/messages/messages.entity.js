const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  tiket: {
    type: mongoose.Types.ObjectId,
    require: [true, 'filed cannot null'],
    ref: 'Tiket'
  },
  content: {
    type: String,
    require: [true, 'content message cannot empty']
  },
  issued_by: {
    type: Schema.Types.ObjectId,
    require: [true, 'filed cannot null'],
    ref: 'User'
  }
},{
  timestamps: true,
  deletedAt: {
    type: Date,
    default: null
  }
})


const Message = mongoose.model('messages',messageSchema)
module.exports = Message
