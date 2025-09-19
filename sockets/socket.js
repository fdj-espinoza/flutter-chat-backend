const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Sockets
io.on('connection', (client) => {
    const token = client.handshake.headers['x-token'];
    const [valid, uid] = comprobarJWT(token);
    console.log(`Client connected - valid: ${valid}, uid: ${uid}`);

    if (!valid) {
        client.disconnect();
        return;
    }
    usuarioConectado(uid);

    //Ingresar al usuario a una sala especifica
    //Sala global, client.id, 
    client.join(uid);

    client.on('mensaje-personal', (payload) => {
        grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });
});