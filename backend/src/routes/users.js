const {Router} = require('express');
const { route } = require('../app');
const router = Router();

const User = require('../models/User');

const faker = require('faker');

router.get('/api/users',async (req, res) => {
    const users = await User.find();
    res.json({users});
});

router.get('/api/users/create', async (req, res) => {
    for(let i = 0; i < 5; i++){
        await User.create({
            nombres: faker.name.firstName(),
            apellidos: faker.name.lastName(),
            avatar: faker.image.avatar(),
            correo: faker.internet.email(),
            password: faker.internet.password()
        });
    }
    res.json({message: '5 Users created'});
});

module.exports = router;