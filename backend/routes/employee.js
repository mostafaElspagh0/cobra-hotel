const express = require("express");
const router = express.Router();
const config = require('config');
const User = require("../services/database/models/user");
const {check, validationResult} = require("express-validator");
const {isA} = require("../services/auth/middlelayers/rolesMiddleLayer");
const Review = require("../services/database/models/review");

router.put('/self',
    [
        isA(["All"]),
        check('name', 'Name is required').isLength({min: 3, max: 25}).notEmpty().optional(),
        check('email', 'Please include a valid email').isEmail().optional(),
        check('password', 'Please enter a password with 6 or more characters').exists().isLength({min: 5}).optional(),
        check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr', 'Receptionist', 'Barista']).optional(),
        check('phone').isLength({min: 11, max: 11}).isNumeric().optional(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            if (!req.user) {
                return res.status(400).json({msg: 'User Not Found'});
            }
            let {name, job_type, email, password, phone, address} = req.body;
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({msg: 'User Not Found'});
            }
            if (name) {
                user.name = name;
            }
            if (job_type) {
                user.job_type = job_type
            }
            if (email) {
                user.email = email
            }
            if (password) {
                user.password = password
            }
            if (phone) {
                user.phone = phone
            }
            if (address) {
                user.address = address
            }

            await user.save();
            const userObj = user.toObject();
            delete userObj.password;
            res.json({msg: 'User is updated', user: userObj});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

//-------post
router.post('/',
    [
        isA(["Hr", "Manager"]),
        check('name', 'Name is required').isLength({min: 3, max: 25}).notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').exists().isLength({min: 5}),
        check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr', 'Receptionist', 'Barista']),
        check('phone').isLength({min: 11, max: 11}).isNumeric(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let {name, job_type, email, password, phone, address} = req.body;
        const user = new User({
            name,
            job_type,
            email,
            password,
            phone,
            address
        });
        try {
            let userExist = await User.findOne({email});
            if (userExist) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'User already exists'}]});
            }
            await user.save();
            const userObj = user.toObject();
            delete userObj.password;
            res.json({msg: 'User created', user: userObj});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//-------getById
router.get('/:id',
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({msg: 'User not found'})
            }
            const userObj = user.toObject();
            delete userObj.password;
            res.json({user: userObj});
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }

    });

//-------deleteById
router.delete('/:id',
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({msg: 'User not found'})
            }
            await user.remove();
            res.json({msg: 'User removed'});
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    });

//-------put
router.put('/:id',
    [
        isA(["Hr", "Manager"]),
        check('name', 'Name is required').isLength({min: 3, max: 25}).notEmpty().optional(),
        check('email', 'Please include a valid email').isEmail().optional(),
        check('password', 'Please enter a password with 6 or more characters').exists().isLength({min: 5}).optional(),
        check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr', 'Receptionist', 'Barista']).optional(),
        check('phone').isLength({min: 11, max: 11}).isNumeric().optional(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            let {name, job_type, email, password, phone, address} = req.body;
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({msg: 'User Not Found'});
            }
            if (name) {
                user.name = name;
            }
            if (job_type) {
                user.job_type = job_type
            }
            if (email) {
                user.email = email
            }
            if (password) {
                user.password = password
            }
            if (phone) {
                user.phone = phone
            }
            if (address) {
                user.address = address
            }

            await user.save();
            const userObj = user.toObject();
            delete userObj.password;
            res.json({msg: 'User is updated', user: userObj});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

//-------pagination
router.get("/",
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        const perPage = req.query.perPage * 1 || config.get('perPage') * 1;
        const page = req.query.page * 1 || 0;
        const search = req.query.search
        if (search) {
            try {
                const users = await User.find({
                    $or: [{name: {$regex: search, $options: 'i'}}, {
                        email: {
                            $regex: search,
                            $options: 'i'
                        }
                    }]
                }).skip(perPage * page).limit(perPage);
                const count = await User.countDocuments({
                    $or: [{
                        name: {
                            $regex: search,
                            $options: 'i'
                        }
                    }, {email: {$regex: search, $options: 'i'}}]
                });
                res.json({users, count});
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }

        } else {
            let users = await User.find().limit(perPage).skip(perPage * page);
            let count = await User.countDocuments();
            return res.json({users, count});
        }
    });


router.post("/review/:id",
    [
        isA(["Hr", "Manager"]),
        check('rating', 'rating is required').isNumeric({min: 1, max: 10}).notEmpty(),
        check('comment', 'comment is required').notEmpty(),
    ],
    async (req, res) => {
        try {
            console.log("dsf")
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors)

                return res.status(400).json({errors: errors.array()});
            }
            if (!req.user) {
                return res.status(401).json({msg: 'You are not authorized'});
            }

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({msg: 'wrong employee id'});
            }
            const {rating, comment} = req.body;

            const review = new Review({
                rating,
                comment,
                user: req.user.id,
                employee: req.params.id
            });
            await review.save();
            user.reviews.push(review);
            await user.save();
            res.json({msg: 'Review is added'});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

router.get("/review/:id",
    [
        isA(["Hr", "Manager"]),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            if (!req.user) {
                return res.status(401).json({msg: 'You are not authorized'});
            }
            const user = await User.findById(req.params.id,'-password').populate('reviews');
            if (!user) {
                return res.status(404).json({msg: 'wrong employee id'});
            }
            res.json({reviews: user.reviews});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;