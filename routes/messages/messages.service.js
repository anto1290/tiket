const Message = require('./messages.entity')

const createMessage = async(req,res) => {
  const idAPp = req.params.idtiket
  const idUser = req.user._id
try {
const {...body} = req.body
body.issued_by = idUser
body.tiket = idAPp
const message = new Message(body)
await message.save()
res.status(201).json(message)
} catch (e) {
  res.status(400).json(e)
}
}

const getMessage = async (req,res) => {
  const idTiket = req.params.id
  try {
    const message = await Message.find({ tiket: idTiket }).exec()
    res.status(200).json(message)
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = {
  getMessage,
  createMessage
}
