var db = require('../../database/index');
var bcrypt = require('bcrypt');

module.exports = function ( req, res, next){
    var { username,password,first_name,last_name,birthdate,bio,profile_image,cover_image } = req.body;
    db.query('select * from user where username="'+username+'";',async (err,username_res) => {
        if(err){
            res.status(400).json({
                status:"error",
                message:'db error!',
                error:err
            })
        }else{
            if(username_res.length > 0){
                res.status(200).json({
                    status:'fail',
                    message:'username already in use!'
                })
            }else{
                var salt = await bcrypt.genSalt();
                var hashed_password = await bcrypt.hash(password,salt);
                var add_user_query = 'insert into user (username,password,first_name,last_name,birthdate,bio,profile_image,cover_image) values ("'+username+'","'+hashed_password+'","'+first_name+'","'+last_name+'","'+birthdate+'","'+bio+'","'+profile_image+'","'+cover_image+'");';
                db.query(add_user_query,(err,result) => {
                    res.status(200).json({
                        status:"success",
                        message:"user sign_up!",
                        err,
                        result,
                    });
                });
            }
        }
    });
}