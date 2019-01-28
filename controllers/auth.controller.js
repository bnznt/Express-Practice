var db = require('../db');
var md5 = require('md5');
var nanoId = require('nanoid');

module.exports = {
    signin: (req, res) => {
        res.render('./auth/signin');
    },

    postSignin: (req, res) => {
        var user = db.get('users').find({email: req.body.email}).value();
        if(!user || user.passwd !== md5(req.body.passwd)){
            res.locals.err = 'Failed to login'
            res.redirect('/auth/signin')
        }
        res.cookie('userId', user.id, {
            signed: true
        });
        res.redirect('/');
    },

    signout: (req, res) => {
        res.clearCookie('userId', {signed: true});
        res.redirect('/');
    },

    signup: (req, res) => {
        res.render('./auth/signup');
    },

    postSignup: (req, res) => {
        req.body.id = nanoId(10);
        req.body.passwd = md5(req.body.passwd);

        db.get('users').push(req.body).write();
        res.cookie('userId', req.body.id, {
            signed: true
        })
        res.redirect('/');
    }
}