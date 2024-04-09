const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/codeial_db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting the database'));

db.once('open', () => {
    console.log('successfully connected to the database');
})