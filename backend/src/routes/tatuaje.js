const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const bodyParser = require('body-parser');
const Tatuaje = require('../models/Tatuaje');
const faker = require('faker');
const app = require('../app');

//Listar todos los Tatuajes
router.get('/api/tatuaje', async (req, res) => {
    const tatuajes = await Tatuaje.find();
    res.json({ tatuajes }).status(200);
    if (tatuajes == null) {
        res.send('No exiten tatuajes').status(404);
    }
});


//Crear 5 usuarios ficticios
router.get('/api/tatuaje/faker', async (req, res) => {
    try{
        for (let i = 0; i < 5; i++) {
            await Tatuaje.create({
                valor: faker.internet.email(),
                imagenTatuaje: faker.internet.password()
            });
        }
        res.json({ message: '5 Tatuajes creados' }).status(201);
    }catch{
        res.status(400).send('Error faker');
    }
});


//Buscar un Tatuaje por su id
router.get("/api/tatuaje/:id", async (req, res) => {
    try {
        const tatuaje = await Tatuaje.findById(req.params.id);
        res.json(tatuaje);
        if (!tatuaje) {
            res.send('El tatuaje no existe').status(400);
        }
    } catch {
        res.status(400).send('Error');
    }
});


//Crear un Tatuaje ingresando datos
router.post('/api/tatuaje/', async (req, res) => {
    const tatuaje = new Tatuaje({
        valor: req.body.nombres,
        imagenTatuaje: req.body.apellidos
    });
    try {
        const savedTatuaje = await Tatuaje.save();
        res.status(201).send('Tatuaje creado');
    } catch {
        res.status(400).json('Creacion de tatuaje fallida');
    }
});



//Modificar un Tatuaje por su id
router.patch("/api/tatuaje/:id", async (req, res) => {
    try {
        const tatuaje = await Tatuaje.findById(req.params.id);
        if (req.body.valor) {
            user.valor = req.body.valor;
        } if (req.body.imagenTatuaje) {
            user.imagenTatuaje = req.body.imagenTatuaje;
        }
        const updateTatuaje = await Tatuaje.save();
        res.status(200).send('Tatuaje actualizado');
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})

//Eliminar Tatuaje
router.delete("/api/tatuaje/:id", async (req, res) => {
    try {
        const removedTatuaje = await Tatuaje.deleteOne({ _id: req.params.id });
        res.json({ message: 'Tatuaje eliminado' });
    } catch {
        res.status(404)
        res.json({ error: "Error" })
    }
})

module.exports = router;