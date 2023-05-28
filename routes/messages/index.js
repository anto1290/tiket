const express = require('express')
const { authenticated } = require('../auth/auth.service')
const messageService = require('./messages.service')
const router = express.Router()

router.get('/:id', authenticated(true), messageService.getMessage)
router.post('/:idtiket', authenticated(true), messageService.createMessage)

module.exports = router
