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
        console.log(req.body);
        var newUser = {
            id: nanoId(10),
            email: req.body.email,
            passwd: md5(req.body.passwd),
            name: req.body.name
        }
        db.get('users').push(newUser).write()
        res.cookie('userId', newUser.id, {
            signed: true
        })
        res.redirect('/');
    }
}