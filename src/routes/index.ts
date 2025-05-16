import { Router } from 'express';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ ok: true, msg: 'API funcionando correctamente' });
});

export default router;
