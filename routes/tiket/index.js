const express = require('express')
const { authenticated } = require('../auth/auth.service')
const tiketService = require('./tiket.service')
const router = express.Router()

router.route('/')
.get(authenticated(true), tiketService.getTiket)
.post(authenticated(true), tiketService.createTiket)

router.route('/:id').patch(authenticated(true), tiketService.updateStatus)
module.exports = router
