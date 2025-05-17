import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export function verificarToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
    return;
  }

  if (!secretKey) {
    res.status(500).json({ mensaje: 'JWT_SECRET no está configurado en el entorno' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    res.status(403).json({ mensaje: 'Token inválido' });
    return;
  }
}

