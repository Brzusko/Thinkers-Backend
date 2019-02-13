const Mongoose = require('mongoose');

const ChannelSchema = new Mongoose.Schema({
    discordId:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    channelType:{
        type: String,
        required: true
    },
    guild: {type: Mongoose.Schema.Types.ObjectId, ref:'ServerModel'}
});

const ChannelModel = Mongoose.model('ChannelModel', ChannelSchema, 'Channels');

module.exports = ChannelModel;