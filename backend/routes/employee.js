const express = require("express"),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('config'),

    mongoose = require("mongoose"),
    User = require("../services/database/models/user"),

    {check, validationResult} = require("express-validator");

router.post('/',
    [
        check('name', 'Name is required') .isLength({min:3,max:25}).notEmpty(),
        check('userName').isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').exists().isLength({ min: 5 }),
        check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr','Receptionist', 'Barista']),
        check('phone').isLength({min:11,max:11}).isNumeric,
    ],

);