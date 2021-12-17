const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  //this is user schema
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
            enum: ['Manager', 'Hr','Secretary', 'Barista'],
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

const hrModel = mongoose.model('user', userScheme);

hrModel.prototype.toJwtPayload = function() {
    const user = this.toObject();
    return {
        id: user._id.toString(),
        name: user.name,
        role: user.role,
    };
}
module.exports = hrModel;
