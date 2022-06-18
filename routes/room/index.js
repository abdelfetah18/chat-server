var room = require('express').Router();
var db = require('../../database');

const room_create = require('./create');
const room_edit = require("./edit");

room.post("/create", room_create);
room.post("/edit", room_edit);

room.get('/:name',( req, res) => {
    var { name } = req.params;
    db.query("select * from rooms where name='"+name+"';",( err, rooms) => {
        if(err){
            res.status(200).json({
                status:"error",
                message:"something went wrong!",
                error:err
            });
        }else{
            if(rooms.length > 0){
                res.status(200).json({
                    status:"success",
                    data:rooms[0]
                });
            }else{
                res.status(200).json({
                    status:"fail",
                    message:"room no exist!"
                })
            }
        }
    });
});

room.get('/',(req,res) => {
    db.query("select * from rooms;",( err, rooms) => {
        if(err){
            res.status(200).json({
                status:"error",
                message:"something went wrong!",
                error:err
            });
        }else{
            if(rooms.length > 0){
                res.status(200).json({
                    status:"success",
                    data:rooms
                });
            }else{
                res.status(200).json({
                    status:"fail",
                    message:"room no exist!"
                })
            }
        }
    });
});

module.exports = room;