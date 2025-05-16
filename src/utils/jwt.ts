import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = '24h'; 

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET variable no definida');
}

export function generarToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY as string, { expiresIn: EXPIRES_IN });
}

export function verificarToken(token: string): any {
  try {
    return jwt.verify(token, SECRET_KEY as string);
  } catch (err) {
    console.error('Error verifying token:', err);
    throw new Error('Token inválido o expirado');
  }
}
