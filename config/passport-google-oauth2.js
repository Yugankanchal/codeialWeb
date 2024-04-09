const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../model/user');

passport.use(new googleStratergy({

    clientID: '960731996407-sl5mqogh42bipqtfvg3mrmn6qsga4n3m.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'


}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({ email: profile.emails[0].value }).then((user) => {
        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }).then((user) => {
                return done(null, user);
            }).catch((err) => {
                console.log('error in creating user in google stratergy passport', err)
            })
        }
    }).catch((err) => {
        console.log('error in google stratergy passport', err);
        return;
    })
}))


module.exports = passport;