
const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    app =express(),
    path = require("express");


mongoose.connect('../services/database/models/user.js');


app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/login.html'));
})
app.post("/register",  (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    req.check('userName','invalidUserName').notEmpty();
    const errors =req.validationErrors();
    if(errors){
        console.log(errors)
        res.redirect('/')
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
