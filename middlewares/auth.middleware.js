module.exports = {
    requireAuth: (req, res, next) => {
        if(!req.signedCookies.userId) {
            res.redirect('/auth/signin');
            return;
        }
        next();
    }
}