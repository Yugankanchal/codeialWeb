// const { Cookie } = require('express-session');
// const { Passport } = require('passport');
const passport = require('passport');
// import user
const User = require('../model/user');
const LocalStratergy = require('passport-local').Strategy
// authentication using passport

passport.use(new LocalStratergy({
    usernameField: 'email'
},
    (email, password, done) => {
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                console.log('user not found');
                return done(null, false);
            }
            else if ((user.password != password)) {
                console.log('invalid username"s password');
                return done(null, false);
            }

            return done(null, user);
        }).catch((err) => {
            console.log('error in finding the user email -> passport ');
            return done(err);
        })
    }))


// serializing the user to decide which key to be kept in the cookie
passport.serializeUser((user, done) => {

    // console.log('serialize');
    done(null, user.id);
})
// deserializing the user from the key in the cookie

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        console.log('error in finding the user ---> passport')
        return done(err);
    })
})

// check wether the user is authenticated

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // 
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;  