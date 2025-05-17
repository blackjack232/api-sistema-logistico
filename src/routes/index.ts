import { Router } from 'express';
import usuarioRoutes from './usuario.routes';
import envioRoutes from './envio.routes';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ ok: true, msg: 'API funcionando correctamente' });
});

router.use('/usuario', usuarioRoutes);
router.use('/envio', envioRoutes);
export default router;
