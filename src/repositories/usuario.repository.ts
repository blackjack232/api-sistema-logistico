
import pool from '../config/database';
import { Usuario } from '../entities/usuario';
import { INSERT_USUARIO_QUERY, SELECT_USUARIOS_QUERY , BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY} from '../sql/usuario.queries';

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const result = await pool.query('SELECT * FROM usuario');
  return result.rows;
}
export const registrarUsuarioRepository= async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
  const result = await pool.query(
    INSERT_USUARIO_QUERY,
    [usuario.nombre, usuario.apellido,usuario.identificacion, usuario.correo_electronico, usuario.contrasena, usuario.tipo_usuario_id]
  );
  return result.rows[0];
};

export const buscarUsuarioByEmail = async (correo: string): Promise<Usuario | null> => {
  const result = await pool.query(SELECT_USUARIOS_QUERY, [correo]);
  return result.rows[0] ?? null;
};

export const buscarUsuarioPorIdentificacionRepository = async (identificacion: string) => {
 
  const result = await pool.query(
    BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY,
    [identificacion]
  );
  return result.rows[0];
};
