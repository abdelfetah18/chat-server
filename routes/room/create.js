var db = require("../../database");

module.exports = function(req,res){
    var { name,privacy,password,profile_image,cover_image,bio } = req.body;
    db.query("select * from rooms where name='"+name+"';",(err,result) => {
        if(err){
            res.status(200).json({
                status:"error",
                message:"something went wrong!",
                error:err
            });
        }else{ 
            if(result.length > 0){
                res.status(200).json({
                    status:"fail",
                    message:"name already in use!"
                });
            }else{
                db.query("insert into rooms (name,privacy,password,admin,creator,profile_image,cover_image,bio) values ('"+name+"','"+privacy+"','"+password+"',"+0+","+0+",'"+profile_image+"','"+cover_image+"','"+bio+"');",(err,result) => {
                    if(err){
                        res.status(200).json({
                            status:"error",
                            message:"something went wrong!",
                            error:err
                        });
                    }else{
                        res.status(200).json({
                            status:"success",
                            message:"room created successufly!",
                            data:{ ...req.body }
                        });
                    }
                });
            }
        }
    });
   
}