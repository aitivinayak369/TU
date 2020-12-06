const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    code:String,
    URL:String,
    count:Number

})

const URLModel =  mongoose.model('URLModel',URLSchema)
module.exports = URLModel;