const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HotelRoomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['single', 'double', 'triple', 'quad', 'queen', 'king'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    roomStatus: {
        type: String,
        enum: ['available', 'booked', 'cleaning', 'maintenance', 'occupied'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
        default: []
    }],
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const HotelRoom = mongoose.model('HotelRoom', HotelRoomSchema);

module.exports = HotelRoom;