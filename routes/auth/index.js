const express = require('express')
const router = express.Router()
const authService = require('./auth.service')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, authService.localStrategy));
router.post('/signup', authService.registerService)
router.post('/signin', authService.login)
router.post('/logout', authService.authenticated(true), authService.logout)

module.exports = router;
