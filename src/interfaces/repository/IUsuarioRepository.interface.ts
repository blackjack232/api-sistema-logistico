import { Usuario } from "../../entities/usuario.interface";
import { UsuarioConRol } from "../../entities/usuarioConRol.interface";
import { UsuarioActivo } from "../../entities/usuariosActivos";

export interface IUsuarioRepository {
  obtenerUsuarios(): Promise<UsuarioActivo[]>;
  registrarUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario>;
  buscarUsuarioByEmail(correo: string): Promise<UsuarioConRol | null>;
  buscarUsuarioPorIdentificacion(identificacion: string): Promise<Usuario | null>;
  
}
