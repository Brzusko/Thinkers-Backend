const Mongoose = require('mongoose');


const TokenSchema = new Mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date
    }
});

const TokenModel = Mongoose.model('TokenModel',TokenSchema,'Api');

module.exports = TokenModel;