const express = require('express')
const router = express.Router()
const UserService = require('./user.service');
const { authenticated } = require('../auth/auth.service');

router.get('/me', authenticated(true), UserService.me)

module.exports = router;
