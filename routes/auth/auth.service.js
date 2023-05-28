const User = require("../users/user.entity")
const Helper = require('../../utils/helper')
const Jwt = require('../../utils/jwt')
const passport = require('passport');

const registerService = async (req, res, next) => {
  try {
    const { password, ...body } = req.body
    body.password = Helper.Password.encode(password)
    const user = new User(body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      res.status(400).json({
        error: 1,
        message: error.message,
        fields: error.errors
      });
    }
    next(error);
  }
}
const localStrategy = async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt -token');
    if (!user) return done();
    if (Helper.Password.verify(user.password,password)) {
      ({ password, ...userWithoutPassword } = user.toObject());
      return done(null, userWithoutPassword);
    }
  } catch (error) {
    done(error);
  }
  done();
}

const login = (req,res,next) => {
  passport.authenticate('local', async (error,user) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ error: 1, message: 'Invalid email or password' });
    let signed = Jwt.sign(user)
    await User.findByIdAndUpdate(user._id, { $push: { token: signed.token } });
    res.json({
      message: 'Login success',
      user,
      token: signed.token,
      refresh_token: signed.refresh_token
    });
  })(req, res, next)
}
const authenticated = (required = false) => async (req, res, next) => {
  try {
    let token = req.headers['authorization']
    if (!token) { throw { status: 401, message: 'Token Invalid' } }
    token = token.replace('Bearer ', '')
    const model = Jwt.decode(token)
    req.token = token
    req.auth = model,
    req.user = await getUser(model)
    next()
  } catch (e) {
    if (required) { 
      res.status(401).json({
          status: 401, 
        message: 'Token Invalidated'
      })
     }
    next()
  }
}

const getUser = async(model) => {
  const {uid,uname, email} = model
  try {
    const user = await User.findById(uid).select('-token -createdAt -updatedAt -password')
    return user;
  } catch (error) {
    return error
  }
}

const logout = async (req,res) => {
  const token = req.token
  const user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false });
  if (!token || !user) {
    res.status(400).json({
      error: 1,
      message: 'Token & User is invalid'
    });
  }
  res.status(200).json({
    error: 0,
    message: 'Logout success'
  });
}
module.exports = {
  registerService,
  login,
  authenticated,
  logout,
  localStrategy
}
