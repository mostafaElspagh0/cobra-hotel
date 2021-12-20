const express = require('express');
const cors = require('cors');
const config = require('config')
const logger = require('morgan');
const liveRouter = require('./routes/live');
const authRouter = require('./routes/auth');
const bodyParser = require("body-parser");
const app = express();

app.use(logger('dev'));
app.use(cors({
    origin: config.get('corsOrigin'),
    credentials: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', liveRouter);
app.use('/live', liveRouter);
app.use('/auth',authRouter);



module.exports = app;