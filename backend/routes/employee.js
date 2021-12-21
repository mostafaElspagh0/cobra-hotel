const express = require("express"),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('config'),
    mongoose = require("mongoose"),
    User = require("../services/database/models/user"),
    {check, validationResult} = require("express-validator");
const {isA} = require("../services/auth/middlelayers/rolesMiddleLayer");

router.post('/',
    [
        isA(["Hr","Manger"]),
        check('name', 'Name is required') .isLength({min:3,max:25}).notEmpty(),
        check('userName').isEmpty(),
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


router.get('/:ID' ,
    async (req , res ) => {
            let D = req.query.Page;
            let df = req.query.perPage;
            let employees = User.find();
            res.json({
                    employees: employees
            })
            employees.find({id: req.params.id}, (err, items) => {
                    if (err) res.status(500).send(error)
                    res.status(200).json(items);

            })
    });


//-------------------
router.delete('/:id',
    async(req,res) =>{
            if(mongoose.isValidObjectId(req.params.id)){
                    User.findByIdAndRemove(req.params.id).then(employee =>{
                            if(employee){
                                    return res.status(200).json({success:true,message:"the employee entry removed successfully"});
                            } else{
                                    return res.status(404).json({success:false,message:"employee entry is not removed"});
                            }
                    })
            }
            else {
                    return res.status(400).send('Invalid Id');
            }
    });
//----------------------