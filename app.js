var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./db');

var authRoute = require('./routes/auth.route');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('aasdlkasjdlas9421'));

app.use('/auth', authRoute);


app.get('/', (req, res, next) => {
    if(req.signedCookies.userId){
        res.locals.user = db.get('users').find({id: req.signedCookies.userId}).value();
    }
    next();
}, (req, res) => {
    res.render('index');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000...')
})