const express = require('express');
const passport = require('../config/passport-local-stratergy');
const route = express.Router();
const commentController = require('../controller/comments_controller');
route.post('/create', passport.checkAuthentication, commentController.createComment);

module.exports = route;