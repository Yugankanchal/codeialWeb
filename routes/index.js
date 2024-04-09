const express = require('express');

const route = express.Router();
const home_controller = require('../controller/home_controller');


route.get('/', home_controller.home);
route.use('/user', require('./user'));
route.use('/post', require('./post'));
route.use('/comments', require('./comment'));
route.use('/api', require('./api'));
module.exports = route;

