import { Usuario } from '../entities/usuario';
import { usuarioRepository } from '../repositories/usuario.repository';
import bcrypt from 'bcrypt';
import { generarToken } from '../utils/jwt'; 
import { IUsuarioService } from '../interfaces/service/IUsuarioService ';
export const usuarioService: IUsuarioService = {
  obtenerUsuarios: async () => {
    return await usuarioRepository.obtenerUsuarios();
  },
  registrarUsuario: async (data: Usuario) => {
    await usuarioRepository.registrarUsuario(data);
  },
  buscarUsuarioPorIdentificacion: async (identificacion: string) => {
    return await usuarioRepository.buscarUsuarioPorIdentificacion(identificacion);
  },
  login: async (correo_electronico: string, contrasena: string) => {
    const usuario = await usuarioRepository.buscarUsuarioByEmail(correo_electronico);
    if (!usuario) throw new Error('Usuario no encontrado');
    if (usuario.activo === 0) throw new Error('Usuario inactivo');

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) throw new Error('Credenciales inválidas');
    const token = generarToken({ id: usuario.id });
    return { token };
  }
}


