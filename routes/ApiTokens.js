const Express = require('express');
const Guild = require('../schemas/server_schema.js');
const router = Express.Router();
const jwt = require('jsonwebtoken');
const Config = require('../config/config.js');
const ApiToken = require('../schemas/api_token_schema.js');


router.get('/register/token', async (req,res)=>{
    let token = await jwt.sign({data:'something'},Config.secret);
    let tokens = new ApiToken({token,createdAt: new Date()});
    await tokens.save().then(succes=>{
        res.status(200);
        res.send(succes.token);
    }).catch(e =>{
        res.status(500);
        res.send({error:"Couldnt generate new token"});
    });
});

router.delete('/prune/token', async (req,res) =>{
    let token = ApiToken.find().cursor();
    let tokens = [];
    token.on('data', (doc)=>{
        tokens.push(doc.token);
        doc.remove();
    });
    token.on('close', ()=>{
        res.status(200);
        res.send({message:'Deleted all tokens', tokens});
    })
});

router.post('/register/verify',(req,res)=>{
    let body = req.body;
    ApiToken.findOne().where('token').equals(body.data.token).then(doc =>{
        if(!doc){
            res.status(500);
            res.send({status:'nf'});
        }
        else{
            res.status(200);
            res.send({status:'f'});
        }

    }).catch(e=>{
        console.log(e);
        res.send('nf')
    })
});

module.exports = router;