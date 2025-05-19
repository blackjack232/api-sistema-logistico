import { Usuario } from "../entities/usuario.interface";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/jwt";
import { IUsuarioService } from "../interfaces/service/IUsuarioService.interface ";
import { IUsuarioRepository } from "../interfaces/repository/IUsuarioRepository.interface";

export class UsuarioService implements IUsuarioService {
  private readonly usuarioRepository: IUsuarioRepository;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  async obtenerUsuarios() {
    return await this.usuarioRepository.obtenerUsuarios();
  }

  async registrarUsuario(data: Usuario) {
    await this.usuarioRepository.registrarUsuario(data);
  }

  async buscarUsuarioPorIdentificacion(identificacion: string) {
    return await this.usuarioRepository.buscarUsuarioPorIdentificacion(
      identificacion
    );
  }

  async login(correo_electronico: string, contrasena: string) {
    const usuario = await this.usuarioRepository.buscarUsuarioByEmail(
      correo_electronico
    );
    console.log("Usuario encontrado:", usuario);
    if (!usuario) throw new Error("Usuario no encontrado");
    if (usuario.activo === 0) throw new Error("Usuario inactivo");

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) throw new Error("Credenciales inválidas");
    const token = generarToken({
      id: usuario.id,
      id_rol: usuario.id_rol,
      nombre_rol: usuario.nombre,
      nombre_usuario: usuario.nombre_usuario,
      apellido_usuario: usuario.apellido_usuario,
      correo: usuario.correo
    });
    return { token };
  }
}
