import { Usuario } from "../../entities/usuario.interface";

export interface IUsuarioRepository {
  obtenerUsuarios(): Promise<Usuario[]>;
  registrarUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario>;
  buscarUsuarioByEmail(correo: string): Promise<Usuario | null>;
  buscarUsuarioPorIdentificacion(identificacion: string): Promise<Usuario | null>;
  
}
