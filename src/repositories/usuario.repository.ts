// import { db } from '../config/db';

// export const obtenerUsuarios = async () => {
//   const [rows] = await db.query('SELECT * FROM users');
//   return rows;
// };


import pool from '../config/database';
import { Usuario } from '../entities/usuario';

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const result = await pool.query('SELECT * FROM usuario');
  return result.rows;
}