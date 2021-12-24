const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('config');
//
const roomScheme = new Schema(
    {
        number: {
            type :Number,
            require :true,
        },
        type :{
            type :String,
            require : true
        },
        full: {
            type :Boolean,
            require: true
        },
        who_in_room :{
            type : String,
            require : false
        },
        price :{
            type : Number,
            require: true
        }

    });
const userModel = mongoose.model('room', roomScheme);