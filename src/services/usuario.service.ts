import { Usuario } from '../entities/usuario';
import { obtenerUsuarios as obtenerUsuariosRepository, registrarUsuarioRepository, buscarUsuarioByEmail, buscarUsuarioPorIdentificacionRepository} from '../repositories/usuario.repository';
import bcrypt from 'bcrypt';
import { generarToken } from '../utils/jwt'; 

export const obtenerUsuarios = async () => {
  return await obtenerUsuariosRepository();
};

export const registrarUsuarioService = async (usuario: Omit<Usuario, 'id'>) => {
  return await registrarUsuarioRepository(usuario);
};
export const buscarUsuarioPorIdentificacionService = async (identificacion : string) => {
  return await buscarUsuarioPorIdentificacionRepository(identificacion);
};

export const loginService = async (correo_electronico: string, contrasena: string) => {
  const usuario = await buscarUsuarioByEmail(correo_electronico);
  if (!usuario) throw new Error('Usuario no encontrado');
  if (usuario.activo === 0) throw new Error('Usuario inactivo');

  const match = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!match) throw new Error('Credenciales inválidas');
  const token = generarToken({ id: usuario.id });
  return { token };

};

