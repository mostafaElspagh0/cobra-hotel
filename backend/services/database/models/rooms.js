const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomScheme = new Schema(
    {

    }
)


const roomModel = mongoose.model('rooms', roomScheme);

module.exports = roomModel;
