const Mongoose = require('mongoose');

const ServerSchema = new Mongoose.Schema({
    guid:{
        type: String,
        unique: true
    },
    rescuePassword:{
        type: String,
        minlength: 6
    },
    apiToken: {
        type: String,
        unique: true
    },
    adminId: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Date
    },
    botChannelAcces:{
        type: Array
    },
    records:{
        type: Array
    }
});

const ServerModel = Mongoose.model('ServerModel', ServerSchema,'Discord');

module.exports = ServerModel;