const Express = require('express');
const Guild = require('../schemas/server_schema.js');
const router = Express.Router();
const jwt = require('jsonwebtoken');
const Config = require('../config/config.js');
const ApiToken = require('../schemas/api_token_schema.js');



const CheckApiToken = (req,res,next) =>{
    next();
}


router.get('/', CheckApiToken, async (req,res) =>{
    res.send();
});

router.get('/setup/:guid', async (req,res)=>{
    console.log('incoming request');
    const body = req.params;
    if(!body.guid){
        res.status(500);
        res.send({error: "U have to provide guid!"});
    }

    let document = await Guild.findOne({guid:body.guid}).catch(e=>{
        console.log(e);
        res.status(501);
        res.send({error: 'Didnt find document with specific id'});
    });
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
        return;
    }
    let tokendo = await ApiToken.findOne().where('token').equals(body.data.token).catch(e=>{console.log(e)});
    if(!tokendo){
        res.status(500);
        res.send({error:'Wrong api token'});
        return;
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
        doc.save().then(async succes =>{
            await tokendo.remove();
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
        return;
    }
});

router.put('/update', CheckApiToken, (req,res) =>{

});


router.delete('/remove', CheckApiToken, (req,res)=>{

});

module.exports = router;