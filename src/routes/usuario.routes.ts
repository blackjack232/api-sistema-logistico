import { Router } from 'express';
import { obtenerUsuarios } from '../controllers/usuario.controller';

const router = Router();

router.get('/', obtenerUsuarios);

export default router;
