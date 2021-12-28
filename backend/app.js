const express = require('express');
const cors = require('cors');
const config = require('config')
const logger = require('morgan');

// require routes
const liveRouter = require('./routes/live');
const authRouter = require('./routes/auth');
const announcementRouter = require('./routes/announcements');
const employeeRouter=require('./routes/employee');
const roomRouter=require('./routes/rooms');
const reservationRouter=require('./routes/reservation');
const reviewRouter=require('./routes/reviews');
const emailRouter=require('./routes/email');

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
app.use('/employee',employeeRouter);
app.use('/announcement',announcementRouter);
app.use("/rooms",roomRouter);
app.use("/reservation",reservationRouter);
app.use("/review",reviewRouter);
app.use("/email",emailRouter);

module.exports = app;