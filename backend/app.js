const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const liveRouter = require('./routes/live');

const app = express();

app.use('/live', liveRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


module.exports = app;
