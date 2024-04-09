const express = require('express');

const route = express.Router();
const postApi = require('../../../controller/api/v1/post_api');
const passport = require('passport');
route.get('/', postApi.index);
route.post('/:id', passport.authenticate('jwt', { session: false }), postApi.destroy);

module.exports = route;