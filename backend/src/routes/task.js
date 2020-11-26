const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const bodyParser = require('body-parser');
const faker = require('faker');
const app = require('../app');
const Task = require('../models/Task');

//Listar todas las tareas
router.get('/api/task', async (req, res) => {
    const tareas = await Task.find();
    res.json({ tareas }).status(200);
    if (tareas == null) {
        res.send('No exiten tareas').status(404);
    }
});


//Crear 5 tareas ficticias
router.get('/api/task/faker', async (req, res) => {
    try {
        for (let i = 0; i < 5; i++) {
            await Task.create({
                titulo: faker.name.title(),
                responsable: faker.name.firstName(),
                descripcion: faker.company.catchPhraseDescriptor(),
                prioridad: faker.hacker.phrase()
            });
        }
        res.json({ message: '5 tareas creados' }).status(201);
    } catch {
        res.status(500).send('Error faker');
    }
});


//Buscar un Tarea por su id
router.get("/api/task/:id", async (req, res) => {
    try {
        const tarea = await Task.findById(req.params.id);
        res.json(tarea);
        if (!tarea) {
            res.send('La tarea no existe').status(400);
        }
    } catch {
        res.status(500).send('Error');
    }
});


//Crear una Tarea ingresando datos
router.post('/api/task/', async (req, res) => {
    const task = new Task({
        titulo: req.body.titulo,
        responsable: req.body.responsable,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad
    });
    try {
        const savedTask = await task.save();
        res.status(201).send('Tarea creada');
    } catch {
        res.status(404).json('Creacion de Tarea fallida');
    }
});


//Modificar un Tarea por su id
router.patch("/api/task/:id", async (req, res) => {
    try {
        const tarea = await Task.findById(req.params.id);
        if (req.body.titulo) {
            alert.titulo = req.body.titulo;
        } if (req.body.responsable) {
            alert.responsable = req.body.responsable;
        } if (req.body.descripcion) {
            alert.descripcion = req.body.descripcion;
        } if (req.body.prioridad) {
            alert.prioridad = req.body.prioridad;
        }
        const updateTask = await tarea.save();
        res.status(200).send('Tarea actualizada');
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})


//Eliminar Tarea
router.delete("/api/task/:id", async (req, res) => {
    try {
        const removedtask = await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Tarea eliminada' });
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})

module.exports = router;