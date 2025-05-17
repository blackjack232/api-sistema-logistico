import { Envio } from "../entities/envio.interface";
import {  EnvioDto } from "../entities/envioDto.interface";
import { IEnvioRepository } from "../interfaces/repository/IEnvioRepository .interface";
import { IUsuarioRepository } from "../interfaces/repository/IUsuarioRepository.interface";
import { IEnvioService } from "../interfaces/service/IEnvioRepository.interface";

import { EnvioRepository } from "../repositories/envio.repository";

export class EnvioService implements IEnvioService {
  private readonly envioRepository: IEnvioRepository;
  private readonly usuarioRepository: IUsuarioRepository;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.envioRepository = new EnvioRepository();
    this.usuarioRepository = usuarioRepository;
  }

  async crearEnvio(envio: EnvioDto): Promise<EnvioDto> {
    // Buscar remitente
    const remitente =
      await this.usuarioRepository.buscarUsuarioPorIdentificacion(
        envio.cedula_remitente
      );
      console.log("remitenteid",remitente)
    let remitenteId: number;
    if (!remitente) {
      const remitenteNuevo = {
        nombre: envio.nombre_remitente || "Remitente", // Asumir campos
        apellido: envio.apellido_remitente || "Sin apellido",
        identificacion: envio.cedula_remitente,
        correo_electronico: this.generarCorreoAleatorio(envio.nombre_remitente, envio.apellido_remitente),
        contrasena: "123456", // Mejor generar password aleatorio o manejar en otro lado
        tipo_usuario_id: 2, // Asumir tipo de usuario, ej: cliente
        activo: 1,
      };
      const usuarioCreado = await this.usuarioRepository.registrarUsuario(
        remitenteNuevo
      );
      console.log("remitente registrado",usuarioCreado)
      remitenteId = usuarioCreado.id;
    } else {
      remitenteId = remitente.id;
    }

    // Buscar destinatario
    const destinatario =
      await this.usuarioRepository.buscarUsuarioPorIdentificacion(
        envio.cedula_destinatario
      );
        console.log("destinatarioid",destinatario)
    let destinatarioId: number;
    if (!destinatario) {
      const destinatarioNuevo = {
        nombre: envio.nombre_destinatario || "Destinatario",
        apellido: envio.apellido_destinatario || "Sin apellido",
        identificacion: envio.cedula_destinatario,
        correo_electronico: this.generarCorreoAleatorio(envio.nombre_destinatario, envio.apellido_destinatario),
        contrasena: "123456",
        tipo_usuario_id: 2,
        activo: 1,
      };
      const usuarioCreado = await this.usuarioRepository.registrarUsuario(
        destinatarioNuevo
      );
       console.log("destinatario registrado",usuarioCreado)
      destinatarioId = usuarioCreado.id;
    } else {
      destinatarioId = destinatario.id;
    }
    const nuevoEnvio: Envio = {
      usuario_remitente_id: remitenteId,
      numero_guia : this.generarNumeroGuia(),
      usuario_destinatario_id: destinatarioId,
      cedula_remitente: envio.cedula_remitente,
      cedula_destinatario: envio.cedula_destinatario,
      direccion_envio: envio.direccion_envio,
      direccion_destino: envio.direccion_destino,
      peso: envio.peso,
      ancho: envio.ancho,
      alto: envio.alto,
      tipo_producto: envio.tipo_producto,
      estado: "En espera", // valor por defecto si no se proporciona
      fecha_creacion: new Date(),
      fecha_modificacion : new Date(),
      usuario_creacion_id: envio.usuario_creacion_id,
      usuario_modificacion_id: envio.usuario_modificacion_id,
    };


    // Insertar envío
    const envioCreado = await this.envioRepository.crearEnvio(nuevoEnvio);
 console.log("envioCreado",envioCreado)
    // Retornar EnvioDto con los campos requeridos
    return {
      ...envioCreado,
      nombre_remitente: envio.nombre_remitente,
      apellido_remitente: envio.apellido_remitente,
      nombre_destinatario: envio.nombre_destinatario,
      apellido_destinatario: envio.apellido_destinatario,
    };
  }
  private generarCorreoAleatorio(nombre: string, apellido: string): string {
    const dominio = "example.com";
    const random = Math.floor(Math.random() * 10000); 
    const correo = `${nombre}.${apellido}${random}@${dominio}`
      .toLowerCase()
      .replace(/\s+/g, "");
    return correo;
  }
  private  generarNumeroGuia(): string {
  const prefijo = "GUIA";
  const timestamp = Date.now(); // número único basado en tiempo
  const aleatorio = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatorios
  return `${prefijo}-${timestamp}-${aleatorio}`;
}

}
