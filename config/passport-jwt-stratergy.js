const passport = require('passport');

const jwtStratergy = require('passport-jwt').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/user');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new jwtStratergy(opts, function (Payload, done) {
    User.findById(Payload._id).then((user) => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch((err) => {
        console.log('error in finding user from database-----> JWT');
    })
}));

module.exports = passport;