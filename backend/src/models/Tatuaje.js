const { date } = require('faker');
const {Schema, model } = require('mongoose');

const tatuajeSchema = new Schema({
    valor: {type: int, required: true},
    imagenTatuaje: {type: String, required: true}
});
module.exports = model('Tatuaje', tatuajeSchema);