const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const bodyParser = require('body-parser');
const faker = require('faker');
const app = require('../app');
const Cliente = require('../models/Cliente');

//Listar todas los clientes
router.get('/api/cliente', async (req, res) => {
    const clientes = await Cliente.find();
    res.json({ clientes }).status(200);
    if (clientes == null) {
        res.send('No exiten clientes').status(404);
    }
});


//Crear 5 clientes ficticias
router.get('/api/cliente/faker', async (req, res) => {
    try {
        for (let i = 0; i < 5; i++) {
            await Cliente.create({
                nombreCompleto: faker.name.middleName(),
                rut: faker.name.firstName(),
                edad: faker.random.number(),
                fechaNacimiento: faker.date.recent(),
                direccion: faker.address.direction(),
                ciudad: faker.address.city(),
                telefono: faker.phone.phoneNumber(),
                email: faker.hacker.phrase()
            });
        }
        res.json({ message: '5 clientes creados' }).status(201);
    } catch {
        res.status(500).send('Error faker');
    }
});


//Buscar un cliente por su id
router.get("/api/cliente/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        res.json(cliente);
        if (!cliente) {
            res.send('El cliente no existe').status(400);
        }
    } catch {
        res.status(500).send('Error');
    }
});


//Crear un cliente ingresando datos
router.post('/api/cliente/', async (req, res) => {
    const cliente = new Cliente({
        nombreCompleto: req.body.nombreCompleto,
        rut: req.body.rut,
        edad: req.body.edad,
        fechaNacimiento: req.body.fechaNacimiento,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        telefono: req.body.telefono,
        email: req.body.email
    });
    try {
        const savedCliente = await cliente.save();
        res.status(201).send('Cliente creada');
    } catch {
        res.status(404).json('Creacion de cliente fallida');
    }
});


//Modificar un Cliente por su id
router.patch("/api/cliente/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (req.body.nombreCompleto) {
            alert.nombreCompleto = req.body.nombreCompleto;

        } if (req.body.rut) {
            alert.rut = req.body.rut;

        } if (req.body.edad) {
            alert.edad = req.body.edad;

        } if (req.body.fechaNacimiento) {
            alert.fechaNacimiento = req.body.fechaNacimiento;

        }if (req.body.direccion) {
            alert.direccion = req.body.direccion;

        } if (req.body.ciudad) {
            alert.ciudad = req.body.ciudad;

        } if (req.body.telefono) {
            alert.telefono = req.body.telefono;

        } if (req.body.email) {
            alert.email = req.body.email;
        }
        const updateCliente = await cliente.save();
        res.status(200).send('Cliente actualizado');
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})


//Eliminar cliente
router.delete("/api/cliente/:id", async (req, res) => {
    try {
        const removedCliente = await Cliente.deleteOne({ _id: req.params.id });
        res.json({ message: 'Cliente eliminada' });
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})

module.exports = router;