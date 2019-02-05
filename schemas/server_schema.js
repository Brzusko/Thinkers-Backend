const Mongoose = require('mongoose');

const ServerSchema = new Mongoose.Schema({
    guid:{
        type: String,
        unique: true,
        required: true
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
});

const ServerModel = Mongoose.model('ServerModel', ServerSchema,'Guilds');

module.exports = ServerModel;