/*
    path: api/mensajes
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const route = Router();

route.get('/:de', validarJWT, obtenerChat);

module.exports = route;