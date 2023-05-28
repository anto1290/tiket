const Message = require("../messages/messages.entity");
const Tiket = require("./tiket.entity");

const makeIdTiket = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const createTiket = async (req,res) => {
  const id = req.user._id
  try {
    const {message, ...body1} = req.body
    body1.issued_by = id
    body1.numberTiket = makeIdTiket(7)
    const tiket = new Tiket(body1)
    await tiket.save()
    const body2 = {
      issued_by: id,
      content: message,
      tiket: tiket._id
    }
    const messages = new Message(body2)
    await messages.save()
    res.status(201).json(
     { 
      tiket: tiket,
      message: messages
    }
    )
  } catch (error) {
    next(error)
  }
}

const getTiket  = async(req,res) => {
try {
  const tiket = await Tiket.aggregate([
    { "$addFields": {
      "priority": {"$cond" : {if: {$eq: ["$level","High"]}, then: 1, else: {
        "$cond": {
          if: { $eq: ["$level", "Medium"] }, then: 2, else: 3 
        }
      }}},
      "reply": {
        "$cond": {
          if: {$eq: ['$status', 'Open']},then: 1, else: {
            "$cond": { if: { $eq: ["$status","Reply"]}, then: 2, else: 3}
          }
        }
      }
    }
    }, { "$sort": { "reply": 1 ,"priority": 1}}
  ])
  res.json(tiket)
} catch (error) {
  res.json(error)
}
}

const updateStatus = async (req,res) => {
  const permit = ['admin','staff']
  const role = req.user.role
  const id = req.params.id
  const body  = req.body
  try {
    if (!permit.includes(role)){ 
      throw { status: 401, message: 'Role Invalid' }
    }
    const tiket = await Tiket.findByIdAndUpdate(id, body, { new: true })
    res.status(200).json(tiket)
  } catch (error) {
    res.status(error.status).json(error)
  }
}
module.exports = {
  createTiket, getTiket, updateStatus

}
