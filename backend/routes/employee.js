const express = require("express"),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    mongoose = require("mongoose"),
    User = require("../services/database/models/user"),
    {check, validationResult} = require("express-validator");
const {isA} = require("../services/auth/middlelayers/rolesMiddleLayer");
router.use(isA(["Hr","Manger"]));
router.post('/',
    [
        check('name', 'Name is required') .isLength({min:3,max:25}).notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').exists().isLength({ min: 5 }),
        check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr','Receptionist', 'Barista']),
        check('phone').isLength({min:11,max:11}).isNumeric(),
    ],
    async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
            }
            let { name,job_type, email, password,phone, address } = req.body;
            const user = new user({
                    name,
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

//-------getById
router.get('/:ID' ,
    async (req , res ) => {
            try {
                    const  id = req.params.id;
                    const user =await User.findById(id)
                    if(!user){
                            return res.status(404).json({msg:'User not found'})
                    }
                    const userObj = user.toObjerct();
                    delete userObj.password;
                    res.json({user:userObj});
            }catch (err){
                    console.log(err.message);
                    res.status(500).send('Server Error')
            }

    });
//-------deleteById
router.delete('/:id',
    async (req , res ) => {
            try {
                    const  id = req.params.id;
                    const user =await User.findById(id)
                    if(!user){
                            return res.status(404).json({msg:'User not found'})
                    }
                    await user.remove();
                    res.json({msg:'User removed'});
            }catch (err){
                    console.log(err.message);
                    res.status(500).send('Server Error')
            }
    });

//-------put
router.put('/:id',
    [
            check('name', 'Name is required') .isLength({min:3,max:25}).notEmpty().optional,
            check('email', 'Please include a valid email').isEmail().optional,
            check('password','Please enter a password with 6 or more characters').exists().isLength({ min: 5 }).optional,
            check('job_type', 'job type is required to be null').isIn(['Manager', 'Hr','Receptionist', 'Barista']).optional,
            check('phone').isLength({min:11,max:11}).isNumeric().optional,
    ],
    async (req , res ) => {
            try{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                        return res.status(400).json({errors:errors.array()});
                }
                let{name,job_type,email,password,phone,address}=req.body;
                const user = await User.findById(req.params.id);
                if(!user){
                        return res.status(404).json({msg:'User Not Found'});
                }
                if(name){
                        user.name=name;
                }
                if(job_type){
                        user.job_type=job_type
                }
                if(email){
                        user.email=email
                }
                if(password){
                        user.password=password
                }
                if(phone){
                        user.phone=phone
                }
                if(address){
                        user.address=address
                }

                await user.save();
                const userObj = user.toObject() ;
                delete userObj.password;
                res.json({msg:'User is updated',user:userObj});
            }catch (err){
                    console.error(err.message);
                    res.status(500).send('Server Error');
            }
    })


module.exports= router;