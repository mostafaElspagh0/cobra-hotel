const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'HotelRoom',
        required: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    nationality:{
        type: String,
        required:true
    },
    checkin: {
        type: Date,
        required: true

    },
    checkout: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;