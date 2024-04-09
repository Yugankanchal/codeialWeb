const express = require('express');
const passport = require('passport');

const route = express.Router();
const user_controller = require('../controller/user_controller');


route.get('/profile/:id', passport.checkAuthentication, user_controller.profile);
route.post('/update/:id', passport.checkAuthentication, user_controller.update);
route.get('/sign-in', user_controller.userSignin);
route.get('/sign-up', user_controller.userSignup);
route.get('/sign-out', user_controller.destroySession);
route.get('/posts', user_controller.posts);

route.post('/create', user_controller.create);

// use passport as middleware to authenticate

route.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: 'user/sign-in',
        failureMessage: true
    }
), user_controller.createSession);
route.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
route.get('/auth/google/callback', passport.authenticate('google ', {
    failureRedirect: '/user/sign-in'
}), user_controller.createSession);
module.exports = route;