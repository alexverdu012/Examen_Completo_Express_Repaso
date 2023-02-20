const {Router} = require('express')
const passport = require('passport')
const router = Router()
const { isLoggedIn, isNotLogged} = require('../lib/auth')

router.get('/login', isNotLogged, (req, res) => res.render('login'))
router.get('/register', isNotLogged, (req, res) => res.render('register'))
router.post('/register', isNotLogged, passport.authenticate('local.register', {
    successRedirect: '/api/auth/profile',
    failureRedirect: '/api/auth/register',
    failureFlash: true
}))

router.post('/login', isNotLogged,  passport.authenticate('local.login', {
    successRedirect: '/api/auth/profile',
    failureRedirect: '/api/auth/login',
    failureFlash: true
}))

router.get('/profile', isLoggedIn, (req, res) => res.render('profile', {"user": req.user}))

router.get('/logout', isLoggedIn, (req, res) => {  
    req.logOut(function(err){
      if (err) return next(err)
    })  
    res.redirect('/api/auth/login')
})

module.exports = router