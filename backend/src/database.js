const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv/config');

function connect(){
    mongoose.connect(process.env.DB_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    const db =mongoose.connection
    db.on('error', (error) => console.error(error)),
    console.log('Database: Connected');
};

module.exports = { connect };