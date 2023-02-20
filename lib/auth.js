module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
           return next()
        }
        return res.redirect('/api/auth/login')
    },

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/api/auth/profile')
    }
}