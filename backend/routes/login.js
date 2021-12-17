
const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    app =express(),
    path = require("express");
const {check, validationResult} = require("express-validator");


mongoose.connect('../services/database/models/user.js');


app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/login.html'));
})
app.post('/register',
    [
        check('username', 'Name is required').notEmpty(),
        check('password','Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else {
        User.register(new User({username: username}), password, (err, user) => {
            if (err) {
                console.log(err);
                return res.render("register");
            }

            passport.authenticate("local")(req, res, function () {
                res.render("secret");
            });
        });
    }
});
