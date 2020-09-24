const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function connect(){
    mongoose.connect('mongodb://matahachi666:Claudiocepg123@143.110.154.244:27017/gpsBD?authSource=admin',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Database: Connected');
};

module.exports = { connect };