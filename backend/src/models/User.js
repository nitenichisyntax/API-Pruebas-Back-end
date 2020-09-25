const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    avatar: String,
    correo: {type: String, required: true},
    password: {type: String, required: true}
});
module.exports = model('User', userSchema);