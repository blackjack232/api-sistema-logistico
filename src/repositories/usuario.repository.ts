import pool from '../config/database';
import { Usuario } from '../entities/usuario.interface';
import { IUsuarioRepository } from '../interfaces/repository/IUsuarioRepository.interface';
import { INSERT_USUARIO_QUERY, SELECT_USUARIOS_QUERY, BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY } from '../sql/usuario.queries';

export class UsuarioRepository implements IUsuarioRepository {
  async obtenerUsuarios(): Promise<Usuario[]> {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
  }

  async registrarUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    console.log('Registrar usuario:', usuario);
    const result = await pool.query(
      INSERT_USUARIO_QUERY,
      [
        usuario.nombre,
        usuario.apellido,
        usuario.identificacion,
        usuario.correo_electronico,
        usuario.contrasena,
        usuario.tipo_usuario_id,
        usuario.activo,
        usuario.telefono,
        usuario.fecha_creacion,
        usuario.usuario_creacion,
        usuario.fecha_modificacion,
        usuario.usuario_modificacion,
      ]
    );
    return result.rows[0];
  }

  async buscarUsuarioByEmail(correo: string): Promise<Usuario | null> {
    const result = await pool.query(SELECT_USUARIOS_QUERY, [correo]);
    return result.rows[0] ?? null;
  }

  async buscarUsuarioPorIdentificacion(identificacion: string): Promise<Usuario | null> {
    const result = await pool.query(
      BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY,
      [identificacion]
    );
    return result.rows[0] ?? null;
  }
}
