import app from './app';
import { createServer } from 'http';
import { setupSwagger } from './config/swagger';

const PORT = process.env.PORT ?? 3002;

setupSwagger(app);
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
