var db = require('../db');

module.exports = {
    index: (req, res) => {
        page = req.query.page || 1;
        itemPerPage = 6;
        start = (page - 1) * itemPerPage;
        end = page * itemPerPage;

        products = db.get('products').value().slice(start, end);

        res.render('products/index', {page: page});
    }
}

