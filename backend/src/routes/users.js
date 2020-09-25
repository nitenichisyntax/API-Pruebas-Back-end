const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const bodyParser = require('body-parser');

const User = require('../models/User');

const faker = require('faker');
const app = require('../app');

//Listar todos los Usuarios
router.get('/api/user', async (req, res) => {
    const users = await User.find();
    res.json({ users }).status(200);
    if (users == null) {
        res.send('No exiten usuarios').status(404);
    }
});


//Crear 5 usuarios ficticios
router.get('/api/user/faker', async (req, res) => {
    try{
        for (let i = 0; i < 5; i++) {
            await User.create({
                nombres: faker.name.firstName(),
                apellidos: faker.name.lastName(),
                avatar: faker.image.avatar(),
                correo: faker.internet.email(),
                password: faker.internet.password()
            });
        }
        res.json({ message: '5 Usuarios creados' }).status(201);
    }catch{
        res.status(400).send('Error faker');
    }
});


//Buscar un Usuario por su id
router.get("/api/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
        if (!user) {
            res.send('El usuario no existe').status(400);
        }
    } catch {
        res.status(400).send('Error');
    }
});


//Crear un usuario ingresando datos
router.post('/api/user/', async (req, res) => {
    const user = new User({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        avatar: req.body.avatar,
        correo: req.body.correo,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.status(201).send('Usuario creado');
    } catch {
        res.status(400).json('Creacion de usuario fallida');
    }
});



//Modificar un Usuario por su id
router.patch("/api/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (req.body.nombres) {
            user.nombres = req.body.nombres;
        } if (req.body.apellidos) {
            user.apellidos = req.body.apellidos;
        } if (req.body.avatar) {
            user.avatar = req.body.avatar;
        } if (req.body.correo) {
            user.correo = req.body.correo;
        } if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.status(200).send('Usuario actualizado');
    } catch {
        res.json({ error: "Error" }).status(404);
    }
})

//Eliminar Usuario
router.delete("/api/user/:id", async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'Usuario eliminado' });
    } catch {
        res.status(404)
        res.json({ error: "Error" })
    }
})

module.exports = router;