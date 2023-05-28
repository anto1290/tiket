var express = require('express');
var router = express.Router();
const config = require('../config');

// Module Route
const auth = require('./auth');
const users = require('./users')
const tiket = require('./tiket')
const message = require('./messages')
// Route Base
router.get('/', (req,res) => {
  res.render('index', { title: config.serviceName })
})
router.use('/auth',auth)
router.use('/users', users)
router.use('/tiket', tiket)
router.use('/messages', message)

module.exports = router;
