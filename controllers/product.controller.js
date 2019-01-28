var db = require('../db');

module.exports = {
    index: (req, res) => {
        page = req.query.page || 1;
        itemPerPage = 6;
        start = (page - 1) * itemPerPage;
        end = page * itemPerPage;

        products = db.get('products').value().slice(start, end);


        if(req.signedCookies.sessionId)
            res.locals.cart = Object.values(db.get('sessions')
                                    .find({ id: req.signedCookies.sessionId })
                                    .get('cart').value()).reduce((a, b) => a + b, 0);

        res.render('products/index', {page: page});
    }
}

