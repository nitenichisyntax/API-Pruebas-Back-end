const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const bodyParser = require('body-parser');

const User = require('../models/Alert');

const faker = require('faker');
const app = require('../app');
const Alert = require('../models/Alert');

//Listar todas las Alertas
router.get('/api/alert', async (req, res) => {
    const alertas = await Alert.find();
    res.json({ alertas }).status(200);
    if (alertas == null) {
        res.send('No exiten alertas').status(404);
    }
});


//Crear 5 alertas ficticias
router.get('/api/alert/faker', async (req, res) => {
    try{
        for (let i = 0; i < 5; i++) {
            await Alert.create({
                latitud: faker.address.latitude(),
                longitud: faker.address.longitude(),
                foto: faker.image.nature(),
                fecha: Date.now(),
                descripcion: faker.lorem.sentence(),
                tipo: faker.helpers.randomize(),
                nivel: faker.helpers.randomize()
            });
        }
        res.json({ message: '5 alertas creados' }).status(201);
    }catch{
        res.status(500).send('Error faker');
    }
});


//Buscar un Alerta por su id
router.get("/api/alert/:id", async (req, res) => {
    try {
        const alerta = await Alert.findById(req.params.id);
        res.json(alerta);
        if (!alerta) {
            res.send('La alerta no existe').status(400);
        }
    } catch {
        res.status(500).send('Error');
    }
});


//Crear una Alerta ingresando datos
router.post('/api/alert/', async (req, res) => {
    const user = new Alert({
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        foto: req.body.foto,
        fecha: Date.now(),
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        nivel: req.body.nivel
    });
    try {
        const savedAlert = await user.save();
        res.status(201).send('Alerta creada');
    } catch {
        res.status(404).json('Creacion de alerta fallida');
    }
});


//Modificar un Alerta por su id
router.patch("/api/alert/:id", async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (req.body.latitud) {
            alert.latitud = req.body.latitud;
        } if (req.body.longitud) {
            alert.longitud = req.body.longitud;
        } if (req.body.foto) {
            alert.foto = req.body.foto;
        } if (req.body.descripcion) {
            alert.descripcion = req.body.descripcion;
        } if (req.body.tipo) {
            alert.tipo = req.body.tipo;
        } if (req.body.nivel) {
            alert.nivel = req.body.nivel;
        }
        const updateAlert = await alert.save();
        res.status(200).send('Alerta actualizada');
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})


//Eliminar Alerta
router.delete("/api/alert/:id", async (req, res) => {
    try {
        const removedalert = await Alert.deleteOne({ _id: req.params.id });
        res.json({ message: 'Alerta eliminada' });
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})

module.exports = router;