const express = require("express"),
     router = express.Router(),
     jwt = require('jsonwebtoken'),
     bcrypt = require('bcryptjs'),
     config = require('config'),

    mongoose = require("mongoose"),
    User = require("../services/database/models/user"),

     {check, validationResult} = require("express-validator");


router.post('/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists().isLength({min:8})
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(200)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(200)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
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
                    res.json({ token });
                }
            );
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;