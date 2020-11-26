const { date } = require('faker');
const {Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombreCompleto: {type: Number, required: true},
    rut: {type: String, required: true},
    edad: {type: Number, required: true},
    fechaNacimiento: {type: Date, required: true},
    direccion: {type: String, required: true},
    ciudad: {type: String, required: true},
    telefono: {type: Number, required: true},
    email: {type: String, required: true}
});
module.exports = model('Cliente', clienteSchema);