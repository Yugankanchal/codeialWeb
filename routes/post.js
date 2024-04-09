const express = require('express');
const passport = require('passport');
const route = express.Router();

const post_controllers = require('../controller/post_controller');
// making a restriction in our action so that no unauthorised person can post {checkAuthentication}
route.post('/create', passport.checkAuthentication, post_controllers.create);
route.get('/destroy/:id', passport.checkAuthentication, post_controllers.destroy);
module.exports = route;

