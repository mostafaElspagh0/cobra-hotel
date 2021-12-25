const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const sendEmail = require("../services/mail/utils/sendEmail");

router.post("/",[
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('subject').isLength({min:1}).withMessage('Please enter a subject'),
    check('message').isLength({min:1}).withMessage('Please enter a message')
],async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const {email, subject, message} = req.body;
    try {
        await sendEmail(email, message, subject);
        res.status(200).json({
            "msg": "email sent"
        })
    } catch (e){
        res.status(500).json({
            "errors" : [{
                "msg" : "failed"
            }]
        })
    }
})

module.exports = router;