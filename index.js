const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const port = 8000;
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const passportJwt = require('./config/passport-jwt-stratergy');
// used for session cookie

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const googlePassport = require('./config/passport-google-oauth2');
const cookieParser = require('cookie-parser');

// for the storage of the session cookie
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets/'));
// app.use("/assets", express.static('./assets/'));
// app.use('/css', express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expresslayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// mongoStore is used to store the session cookie in Db
app.use(session({
    name: 'codeial',
    secret: 'blahSomething',
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/codeial_db'
    }),
    resave: false,
    cookies: {
        maxAge: (1000 * 100 * 60)
    },

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleWare.setFlash);
app.use('/', require('./routes'));
app.listen(port, (err) => {
    if (err) {
        console.log('error');
        return;
    }
    console.log(`server is running on the port: ${port}`)
})

// module.exports = app;