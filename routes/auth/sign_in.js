var db = require('../../database/index');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');

var privateKEY  = fs.readFileSync(__dirname+'/../../secret/private.key', 'utf8');
var publicKEY  = fs.readFileSync(__dirname+'/../../secret/public.key', 'utf8');

module.exports = function ( req, res, next){
    var { username,password } = req.body;

    var user_query = 'select * from user where username="'+username+'";';
    db.query(user_query,async (err,result) => {
        if(result.length > 0){
            var { user_id,username,password:encrypted_pwd } = result[0];
            var is_true = await bcrypt.compare(password,encrypted_pwd);
            if(is_true){
                var token = jwt.sign({
                    user_id,username
                },privateKEY,{
                    algorithm:"RS256",
                    issuer:"http://127.0.0.1:3000/public/",
                    expiresIn:1000*60*60,
                });
                res.status(200).json({
                    status:"success",
                    message:"user sign_in!",
                    token,
                });
            }else{
                res.status(200).json({
                    status:'error',
                    message:'bad password!'
                })
            }
            
        }else{
            res.status(200).json({
                status:'error',
                message:'user not found!'
            })
        }
    });
}