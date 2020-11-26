const {Schema, model } = require('mongoose');

const taskSchema = new Schema({
    titulo: {type: String, required: true},
    responsable: {type: String, required: true},
    descripcion: {type: String, required: true},
    prioridad: {type: String, required: true}
});
module.exports = model('Task', taskSchema);