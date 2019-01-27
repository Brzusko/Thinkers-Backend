//3rd party modules
const Express = require("express");

const Mongoose = require('mongoose');

//Developer modules
const ServerModel = require('./schemas/server_schema.js');


Mongoose.connect('mongodb://localhost:27017/Discord');

db = Mongoose.connection;

db.on('error', (e=>console.log(e)));
db.once('open',()=>{
    console.log('Test works');
    let server = new ServerModel({
        guid:'RazdwatrzyTest',
        rescuePassword:'dddasdsadsadas',
        apiToken:'DDaassDDaa',
        adminId:'DSdadasdsadas',
        joinedAt: new Date(),
        botChannelAcces: new Array(),
        records: new Array()
    }); 
    server.save();   
});





const Config = require("./config/config.js");

const app = Express();

app.get('/', (req,res)=>{
    res.set('json');
    res.send({name:'Test',something:'Chuj'});
});

app.listen(Config.port, ()=>{
    console.log("Listening on port " + Config.port);
})
console.log("Backend Server Works!");