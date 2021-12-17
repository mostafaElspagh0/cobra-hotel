const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  //this is user schema
const userScheme = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        userName : {
            type : String,
            required: true,
            unique: true
        },
        job_type : {
            type : String ,
            required:true

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
    }
)

const hrModel = mongoose.model('user', userScheme);

module.exports = hrModel;
