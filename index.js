//3rd party modules
const Express = require("express");

const Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Developer modules
const ServerModel = require('./schemas/server_schema.js');
const GuildRoute = require('./routes/Guild.js');
const ApiRoute = require('./routes/ApiTokens.js');
Mongoose.connect('mongodb://localhost:27017/Discord');
Mongoose.set('useFindAndModify', false);
db = Mongoose.connection;

db.on('error', (e=>console.log(e)));
db.once('open',()=>{
});
const Config = require("./config/config.js");
const app = Express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/', GuildRoute, ApiRoute);

app.listen(Config.port, ()=>{
    console.log("Listening on port " + Config.port);
})
console.log("Backend Server Works!");
