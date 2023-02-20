const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('./helpers')

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const [ rows ] = await pool.query('SELECT * FROM Users WHERE email = ?', [email])
    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            
            done(null, user, req.flash('success', 'Welcome'))
        } else {
            done(null, false, req.flash('message', 'Incorrrect Password'))
        }
    } else {
        return done(null, false, req.flash('message', 'Username does not exists'))
    }
}))


passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const { name } = req.body
    const newUser = {
        name,
        email,
        password
    }

    newUser.password = await helpers.encryptPassword(password)
    const [ result ] = await pool.query('INSERT INTO Users SET ?', [newUser])
    newUser.id = result.insertId
    //console.log(result.insertId)
    return done(null, newUser)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const [ rows ] = await pool.query('SELECT * FROM Users WHERE id = ?', [id])
    done(null, rows[0])
})

module.exports = passport