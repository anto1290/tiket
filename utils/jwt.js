const jwt = require('jsonwebtoken')
const config = require('../config')


const AuthModel = (m) => ({
  uid: m.id || m.uid || m._id || null,
  // aid: m.aid || null,
  uname: m.name || m.fullName || m.uname || null,
  email: m.email || null,
})

const SignModel = (m) => ({
  token: m.token,
  refresh_token: m.refreshToken,
})
const RefreshModel = (token) => SignModel(token)
const sign = (model) => {
  const token = jwt.sign(AuthModel(model), config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRED })
  const refreshToken = jwt.sign(AuthModel(model), config.JWT_SECRET_KEY, { expiresIn: '3d' })
  return { token, refreshToken }
}
const verify = (token) => {
  return jwt.verify(token, config.JWT_SECRET_KEY)
}
const valid = (token) => {
  return !!verify(token)
}
const decode = (token) => {
  if (valid(token)) {
    return jwt.decode(token)
  }
  return {}
}
const refresh = (token) => {
  if (valid(token)) {
    return jwt.sign(token)
  }
  return null
}
const model = {
  sign(model) {
    const resp = sign(model)
    return SignModel(resp)
  },
  refresh(token) {
    const refreshToken = refresh(token)
    return RefreshModel(refreshToken)
  },
  valid(token) {
    return valid(token)
  },
  decode(token) {
    return decode(token)
  }
}


module.exports = {
  ...model
}
