const Express = require('express');
const Guild = require('../schemas/server_schema.js');
const Channel = require('../schemas/channel_schema.js');
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
        return;
    }
    Guild.findOne().where('guid').equals(body.guid).then(doc =>{
        if(!doc){
            res.status(501);
            res.send({error: `Didnt find guild with that id ${body.guid}`});
            return;
        }
        res.status(200);
        //Trzeba dodac pozniej wysylanie kanalow.
        res.send({is_Registred:true,apiToken:doc.apiToken});
    })
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
        res.status(501);
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
            adminId: body.data.adminId,
            guildName: body.data.guildName,
            usersCount: body.data.usersCount
        }
        let doc = new Guild(obj);
        doc.save().then(async succes =>{
            await tokendo.remove();
            res.status(200);
            res.send();
        }).catch(e=>{
            console.log(e);
            res.status(502);
            res.send({error:'Something goes wrong with database!'});
        });
    } else{
        res.status(503)
        res.send({error: 'That guild is already registred!'});
        return;
    }
});

router.put('/setup/channel', (req,res)=>{
    let body = req.body;
    if(!body.data.guid || !body.data.type){
        res.status(500);
        res.send({error:'Please provide guild id!'});
        return;
    }

    Guild.findOne().where('guid').equals(body.data.guid)
    .exec().then(doc =>{
        if(!doc){
            res.status(501).send({error:'Didnt findt guild with that id!'});
            return;
        }
        let obj = {
            discordId:body.data.discordId,
            name:body.data.name,
            channelType:body.data.type,
            guild: doc._id
        };
        let channel = new Channel(obj).save().then(ch=>{
            res.status(200);
            res.send();
            return;
        }).catch(e =>{
            res.status(502).send();
            console.log(e);
        });
    }).catch(e=>{res.status(503).send(); console.log(e)});

    
})

router.put('/update', CheckApiToken, (req,res) =>{

});


router.delete('/remove', CheckApiToken, (req,res)=>{

});

module.exports = router;