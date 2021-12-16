const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require ('passport')
const liveRouter = require('./routes/live');
const {cookie} = require("express-validator");
const {httpOnly, expires} = require("express-session/session/cookie");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const app = express();

app.use('/live', liveRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(session({
    name : 'sessionId',
    secret : 'secretary',
    saveUninitialized : false ,
    resave : false,

    cookie : {
        secure : false ,
        httpOnly: false ,
        expires : new Date(Date.now()+ 60 * 60 * 1000)
}
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


module.exports = app;
