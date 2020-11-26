const { date } = require('faker');
const {Schema, model } = require('mongoose');

const tatuadorSchema = new Schema({
    nombreCompleto: {type: String, required: true},
    domicilio: {type: String, required: true},
    RUT: {type: String, required: true},
    email: {type: String, required: true}
});
module.exports = model('Tatuador', tatuadorSchema);