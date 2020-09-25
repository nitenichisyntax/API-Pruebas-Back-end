const { date } = require('faker');
const {Schema, model } = require('mongoose');

const alertSchema = new Schema({
    latitud: {type: Number, required: true},
    longitud: {type: Number, required: true},
    foto: {type: String, required: true},
    fecha: {type: Date, required: true},
    descripcion: {type: String, required: true},
    tipo: {type: String, required: true},
    nivel: {type: String, required: true}
});
module.exports = model('Alert', alertSchema);