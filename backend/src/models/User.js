const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombres: String,
    apellidos: String,
    avatar: String,
    correo: String,
    password: String
});
module.exports = model('User', userSchema);