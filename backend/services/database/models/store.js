const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeScheme = new Schema(
    {

    }
)


const storeModel = mongoose.model('store', storeScheme);

module.exports = storeModel;
