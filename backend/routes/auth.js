const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require("../services/database/models/user");
const sendResetPassword = require("../services/auth/utils/sendResetPassword")
const {check, validationResult} = require("express-validator");
const validateToken = require("../services/auth/utils/validateToken");

//-----login------
router.post('/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists().isLength({min: 8})
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                return res
                    .status(200)
                    .json({errors: [{msg: 'Invalid credentials'}]});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(200)
                    .json({errors: [{msg: 'Invalid credentials'}]});
            }

            const payload = {
                user: user.toJwtPayload()
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                config.get('jwt_config'),
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.post('/forgetPassword', [
    check('email', 'Please include a valid email').isEmail()
], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let {email} = req.body;
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({errors: [{msg: 'Invalid credentials'}]});
        }
        await sendResetPassword(user.email)
        res.status(200).json({msg: 'Email sent'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
    
router.post("/resetPassword",
    [
        check("token").notEmpty(),
        check("new_password").notEmpty(),
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let {token, new_password} = req.body;
        let decoded = await validateToken(token);

        if(!decoded){
            return res.status(400).json({errors: [{msg: 'Invalid token'}]});
        }
        let user = await User.findOne({"email": decoded.email});
        if (!user) {
            return res
                .status(401)
                .json({errors: [{msg: 'Invalid credentials'}]});
        }
        user.password = new_password;
        await user.save();
        return res.status(200).json({
            msg: "password reset successfully "
        })
    }
)


module.exports = router;