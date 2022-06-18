var mysql = require('mysql');
var db;
const CONNECTION_OPTIONS = {
    user:"oL9kuWYgjI",
    password:"GTJqEGCQP6",
    database:"oL9kuWYgjI",
    port:3306,
    host:"remotemysql.com"
};

connect();

function connect(){
    db = mysql.createConnection(CONNECTION_OPTIONS);
    db.connect((err,args) => {
        console.log("db_err:",err);
        console.log("db_args:",args);
    });
    db.on('error', function(err) {
        console.log(err.code);
        connect();
    });
}

module.exports = db;