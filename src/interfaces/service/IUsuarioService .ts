import { Usuario } from "../../entities/usuario";

export interface IUsuarioService {
  obtenerUsuarios(): Promise<any[]>;
  registrarUsuario(data: Usuario): Promise<void>;
  login(correo: string, contraseña: string): Promise<any>;
  buscarUsuarioPorIdentificacion(identificacion: string): Promise<any>;
}
