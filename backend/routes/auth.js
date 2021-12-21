const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require("../services/database/models/user");
const {check, validationResult} = require("express-validator");
const { isManager,isHr} = require("../services/auth/middlelayers/rolesMiddleLayer");

//-----login------
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
            const isMatch = await bcrypt.compare(password, User.password);
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