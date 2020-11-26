const { date } = require('faker');
const {Schema, model } = require('mongoose');

const logsSchema = new Schema({
    fechaHora: {type: int, required: true},
    descripcion: {type: String, required: true}
});
module.exports = model('Logs', logsSchema);