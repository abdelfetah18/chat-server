const routes = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const public = require('./public');
const room = require('./room');

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/public', public);
routes.use('/room', room);

routes.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Hello world!' });
});

module.exports = routes;