var nanoId = require('nanoid');
var db = require('../db');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        var sessionId = nanoId(5);
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('sessions').push({ id: sessionId, cart: {} }).write();
    }
    next();
}