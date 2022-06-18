const PORT = process.env.PORT || 3000;
const db = require('./database');
var express = require('express');
var app = express();
var routes = require('./routes');
var wss = require('./websocket');

app.use(express.json())
app.use(express.urlencoded());
app.use('/', routes);

app.listen(PORT,() => console.log('Server running on',PORT,'!'));