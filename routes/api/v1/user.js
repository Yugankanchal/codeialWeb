const express = require('express');
const route = express.Router();

const userApi = require('../../../controller/api/v1/users_api');

route.post('/create-session', userApi.createSession);


module.exports = route;