import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import redisClient from './config/redisClient';
import { setupSwagger } from './config/swagger';

const PORT = process.env.PORT ?? 3002;

const server = createServer(app);
setupSwagger(app);

// Configuramos Socket.IO con CORS para permitir conexión frontend
const io = new Server(server, {
  cors: {
    origin: '*', // Cambia esto por la URL de tu frontend en producción
  },
});

async function startServer() {
  try {
    await redisClient.connect();
    console.log('✅ Redis conectado correctamente');

    // Creamos un cliente duplicado para suscripción pub/sub
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    // Nos suscribimos a un canal para escuchar cambios en envíos
    await subscriber.subscribe('envio_cambios', (mensaje) => {
      console.log('🔔 Cambio recibido en Redis:', mensaje);
      // Emitimos el mensaje a todos los clientes conectados vía Socket.IO
      io.emit('envio_actualizado', mensaje);
    });

    // Evento para cuando un cliente se conecta por websocket
    io.on('connection', (socket) => {
      console.log('🟢 Cliente conectado:', socket.id);

      // Opcional: escuchar mensajes desde el cliente si quieres
      socket.on('ping', () => {
        socket.emit('pong');
      });
    });

    server.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error conectando a Redis o iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();

