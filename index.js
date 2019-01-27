//3rd party modules
const Express = require("express");

//Developer modules
const Config = require("./config/config.js");

const app = Express();

app.get('/', (req,res)=>{
    res.send("App works!");
});

app.listen(Config.port, ()=>{
    console.log("Listening on port " + Config.port);
})
console.log("Backend Server Works!");