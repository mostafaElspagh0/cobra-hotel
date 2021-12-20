const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('config');
const userScheme = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 25
        },
        userName : {
            type : String,
            required: true,
            unique: true
        },
        job_type : {
            type : String ,
            required:true,
            enum: ['Manager', 'Hr','Receptionist', 'Barista'],
            default: 'user',
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 50
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        phone: {
            type: String,
            required: false,
            minlength: 11,
            maxlength: 11
        },
        address: {
            type: String,
            required: false
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
)

userScheme.pre('save',function(next){
    const user =this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(config.get("SALT_WORK_FACTOR"),function(err,salt){
        if(err)return  next(err);
        bcrypt.hash(user.password,salt,function (err,hash){
            if(err) return next(err);
            user.password=hash;
            next();
        });
    });
})

const userModel = mongoose.model('user', userScheme);

userModel.prototype.toJwtPayload = function() {
    const user = this.toObject();
    return {
        id: user._id.toString(),
        job_type: user.job_type,
    };
}
module.exports = userModel;
