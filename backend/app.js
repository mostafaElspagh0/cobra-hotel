const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('config')
const logger = require('morgan');
const liveRouter = require('./routes/live');
const authRouter = require('./routes/auth');

const bodyParser = require("body-parser");
const app = express();

app.use('/', liveRouter);
app.use('/live', liveRouter);
app.use('/auth',authRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: config.get('corsOrigin'),
    credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = app;