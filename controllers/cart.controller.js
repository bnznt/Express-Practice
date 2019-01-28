var db = require('../db');

module.exports = {
    addToCart: (req, res) => {
        var count = db.get('sessions')
                      .find({ id: req.signedCookies.sessionId })
                      .get('cart')
                      .get(req.params.id).value() || 0;
        db.get('sessions')
          .find({ id: req.signedCookies.sessionId })
          .get('cart')
          .set(req.params.id, count + 1).write();
        
        res.redirect('/products');
    }
}