const bcrypt = require('bcrypt');
const config = require('../config');


const Password = {
  SALT: Number(config.SALT),
  salted() {
    return bcrypt.genSaltSync(this.SALT)
  },
  encode(text) {
    return bcrypt.hashSync(text, this.salted())
  },
  verify(hash, text) {
    return bcrypt.compareSync(text, hash)
  }
}

module.exports = {
  Password
}
