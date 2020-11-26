const { date } = require('faker');
const {Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    correo: {type: String, required: true},
    password: {type: String, required: true},
    rut: {type: String, required: true}
});
module.exports = model('Usuario', usuarioSchema);