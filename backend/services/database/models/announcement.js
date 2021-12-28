const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const announcementScheme = new Schema(
    {
        issued_by: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        target_audience: {
            type: String,
            enum: ["All", 'Manager', 'Hr', 'Receptionist', 'Barista'],
            default: 'All',
        },
        title: {
            type: String
        },
        body: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        read_by: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
            default: []
        }]
    },
)
const announcementModel = mongoose.model('announcement', announcementScheme);
module.exports = announcementModel;