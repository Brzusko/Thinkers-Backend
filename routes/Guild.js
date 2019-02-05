const Express = require('express');
const Guild = require('../schemas/server_schema.js');
const router = Express.Router();
const jwt = require('jsonwebtoken');
const Config = require('../config/config.js');



const CheckApiToken = (req,res,next) =>{
    next();
}


router.get('/', CheckApiToken, async (req,res) =>{
    var token = await jwt.sign({data:'dupa'},"123chuj");
    let dummy = new Guild({
        guid:'Jeden dwa trzy',
        rescuePassword:'chujmiWdupe',
        apiToken: token,
        adminId:'11232132321',
    });
    res.status(200);
    res.send(dummy);
});

router.get('/setup/:guid', async (req,res)=>{
    const body = req.params;
    if(!body.guid){
        res.status(500);
        res.send({error: "U have to provide guid!"});
    }

    let document = await Guild.findOne({guid:body.guid});
    if(!document){
        res.status(501);
        res.send({error: 'Didnt find document with specific id'});
    } else{
        res.status(200);
        res.send({apiToken: document.apiToken, is_Registred:true});
    }
});

router.post('/register', async (req,res) =>{
    const body = req.body;
    if(!body.data.guid){
        res.status(400).json({error: 'Bad Guild data provided'});
        res.send();
    }
    let document = await Guild.findOne({guid: body.data.guid});
    if(!document)
    {
        let token = await jwt.sign({guid:body.data.guid, adminId: body.data.adminId},Config.secret);
        let obj = {
            guid: body.data.guid,
            apiToken: token,
            adminId: body.data.adminId
        }
        let doc = new Guild(obj);
        doc.save().then(succes =>{
            res.status(200);
            res.send();
        }).catch(e=>{
            console.log(e);
            res.status(500);
            res.send({error:'Something goes wrong with database!'});
        });
    } else{
        res.status(500)
        res.send({error: 'That guild is already registred!'});
    }
});

router.put('/update', CheckApiToken, (req,res) =>{

});

router.put('/test', (req,res)=>{
    let dummy = new Guild({
        guid:'335544433',
        rescuePassword:'chujmiWdupe',
        apiToken: '1123213214235',
        adminId:'11232132321',
    });
    dummy.save();
    res.send();
});

router.delete('/remove', CheckApiToken, (req,res)=>{

});

module.exports = router;