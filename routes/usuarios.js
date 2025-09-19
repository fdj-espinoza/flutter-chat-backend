/*
    path: api/usuarios
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');

const route = Router();

route.get('/', validarJWT, getUsuarios);

module.exports = route;