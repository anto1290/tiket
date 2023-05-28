const User = require("./user.entity")
const Helper = require('../../utils/helper')


const me = async (req,res) => {
  try {
    const user = await req.user
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json(error)
  }
}
 
 module.exports = {
  me
 }
