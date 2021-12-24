const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('config');
const drinkScheme = new Schema(
    {
        name :{
            type:String,
            require:true
        },
        type:{
            type:String,
            require:true
        },
        size:{
            type:String,
            require:false
        },
        available:{
            type:Number,
            require:true
        },
        sold_out:{
            type:Number,
            require:true
        },
        room:{
            type:Number,
            require:false
        },
        price:{
            type:Number,
            require:true
        }


    });

const drinkModel = mongoose.model('user', drinkScheme);