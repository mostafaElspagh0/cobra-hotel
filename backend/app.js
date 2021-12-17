const express = require('express');
const cookieParser = require('cookie-parser');
//--
const cors = require('cors');

const logger = require('morgan');
const passport = require ('passport')
const liveRouter = require('./routes/live');
const loginRouter = require('./routes/auth');

const bodyParser = require("body-parser");
const app = express();

app.use('/', liveRouter);
app.use('/live', liveRouter);
app.use('/login',loginRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = app;