import { Request, Response } from 'express';
import { obtenerUsuarios as obtenerUsuariosService } from '../services/usuario.service';

export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const users = await obtenerUsuariosService();
    res.json({ ok: true, data: users });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error interno del servidor' });
  }
};
