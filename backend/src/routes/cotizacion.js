const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const bodyParser = require('body-parser');
const faker = require('faker');
const app = require('../app');
const Cotizacion = require('../models/Cotizacion');

//Listar todas los cotizaciones
router.get('/api/cotizacion', async (req, res) => {
    const cotizaciones = await Cotizacion.find();
    res.json({ cotizaciones }).status(200);
    if (cotizaciones == null) {
        res.send('No exiten cotizaciones').status(404);
    }
});


//Crear 5 cotizaciones ficticias
router.get('/api/cotizacion/faker', async (req, res) => {
    try {
        for (let i = 0; i < 5; i++) {
            await Cotizacion.create({
                valor: faker.random.number(),
                lugarCuerpo: faker.address.state(),
                descripcionTatuaje: faker.lorem.sentence(),
                imagenTatuje: faker.internet.avatar(),
                fechaRealizar: faker.date.recent(),
                estado: true
            });
        }
        res.json({ message: '5 cotizaciones creados' }).status(201);
    } catch {
        res.status(500).send('Error faker');
    }
});


//Buscar una cotizacion por su id
router.get("/api/cotizacion/:id", async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id);
        res.json(cotizacion);
        if (!cotizacion) {
            res.send('La cotización no existe').status(400);
        }
    } catch {
        res.status(500).send('Error');
    }
});


//Crear una cotizacion ingresando datos
router.post('/api/cotizacion/', async (req, res) => {
    const cotizacion = new Cotizacion({
        valor: req.body.valor,
        lugarCuerpo: req.body.lugarCuerpo,
        descripcionTatuaje: req.body.descripcionTatuaje,
        imagenTatuje: req.body.imagenTatuje,
        fechaRealizar: req.body.fechaRealizar,
        estado: req.body.estado
    });
    try {
        const savedCotizacion = await cotizacion.save();
        res.status(201).send('Cotización creada');
    } catch {
        res.status(404).json('Creacion de cotización fallida');
    }
});


//Modificar un Cotizacion por su id
router.patch("/api/cotizacion/:id", async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id);
        if (req.body.valor) {
            alert.valor = req.body.valor;

        } if (req.body.lugarCuerpo) {
            alert.lugarCuerpo = req.body.lugarCuerpo;

        } if (req.body.descripcionTatuaje) {
            alert.descripcionTatuaje = req.body.descripcionTatuaje;

        } if (req.body.imagenTatuje) {
            alert.imagenTatuje = req.body.imagenTatuje;

        }if (req.body.fechaRealizar) {
            alert.fechaRealizar = req.body.fechaRealizar;

        } if (req.body.estado) {
            alert.estado = req.body.estado;

        } 
        const updateCotizacion = await cotizacion.save();
        res.status(200).send('Cotización actualizado');
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})


//Eliminar Cotizacion
router.delete("/api/cotizacion/:id", async (req, res) => {
    try {
        const removedCotizacion = await Cotizacion.deleteOne({ _id: req.params.id });
        res.json({ message: 'Cotización eliminada' });
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})

module.exports = router;