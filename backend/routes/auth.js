const express = require("express"),
     router = express.Router(),
     jwt = require('jsonwebtoken'),
     bcrypt = require('bcryptjs'),
     config = require('config'),
     mongoose = require("mongoose"),
     User = require("../services/database/models/user"),
     {check, validationResult} = require("express-validator"),
     { isManager} = require("../services/auth/middlelayers/rolesMiddleLayer");

router.post('/register',
    [
        isManager,
        check('name', 'Name is required') .isLength({min:3,max:25}).notEmpty(),
        check('userName').isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').exists().isLength({ min: 5 }),
        check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr','Receptionist', 'Barista']),
        check('phone').isLength({min:11,max:11}).isNumeric,
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { name,userNme,job_type, email, password,phone, address } = req.body;
        const user = new user({
            name,
            userNme,
            job_type,
            email,
            password,
            phone,
            address

        });
        try {
            let userExist = await User.findOne({ email });
            if (userExist) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }
            await user.save();
            const userObj=user.toObject();
            delete userObj.password;
            res.json({msg:'User created',user : userObj });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


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