const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensajes');

const usuarioConectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async( payload ) => {
    /*
    {
        de: 'usuario1',
        para: 'usuario2',
        mensaje: 'Hola, ¿cómo estás?'
    }
    */
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        return mensaje;
    } catch (error) {
        console.error('Error al grabar mensaje:', error);
        throw new Error('Error al grabar mensaje');
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}