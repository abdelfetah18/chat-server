const user = require('express').Router();
var db = require('../../database')
var jwt = require('jsonwebtoken');
var fs = require('fs');
var privateKEY  = fs.readFileSync(__dirname+'/../../secret/private.key', 'utf8');

user.get('/',(req,res) => {
    var token = req.headers['authorization'];
    var verify = jwt.verify(token,privateKEY,{
        algorithms:'RS256'
    },(err,data) => {
        if(err){
            res.status(200).json({
                status:'error',
                ...err
            })
        }else{
            var { user_id,username } = data;
            db.query('select user_id,username,first_name,last_name,profile_image,cover_image,bio,created_at from user where user_id='+user_id+' and username="'+username+'";',(err,result) => {
                if(result.length > 0){
                    res.status(200).json({
                        token,
                        verify,
                        data:{ ...result[0] },
                    });
                }else{
                    res.status(200).json({
                        status:'success',
                        message:'user not exist! maybe the user deleted or something!'
                    })
                }
            });
        }
    });
    
    
});

module.exports = user;