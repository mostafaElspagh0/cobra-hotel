const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const announcementScheme = new Schema(
    {
        issued_by : {
            _id: String ,
            required : true
        },
        target_audience : {
            type : String ,
            enum: ['Manager', 'Hr','Receptionist', 'Barista'],
            default: 'All',
        },
        title :{
            type :   String
        },
        body :{
          type :   String
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
const announcementModel = mongoose.model('announcement', announcementScheme);
module.exports = announcementModel;