const { date } = require('faker');
const {Schema, model } = require('mongoose');

const cotizacionSchema = new Schema({
    valor: {type: Number, required: true},
    lugarCuerpo: {type: String, required: true},
    descripcionTatuaje: {type: String, required: true},
    imagenTatuje: {type: String, required: true},
    fechaRealizar: {type: Date, required: true},
    estado: {type: Boolean, required: true}
});
module.exports = model('Cotizacion', cotizacionSchema);