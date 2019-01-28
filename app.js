var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./db');

var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();

app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('aasdlkasjdlas9421'));
app.use(sessionMiddleware);

app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.get('/', (req, res, next) => {
    if(req.signedCookies.userId){
        console.log(req.signedCookies);
        res.locals.user = db.get('users').find({id: req.signedCookies.userId}).value();
    }
    next();
}, (req, res) => {
    res.render('index');
})

// app.get('/', (req, res) => {
//     res.render('index');
// })

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000...')
})