import { Envio } from "../entities/envio.interface";
import { EnvioDto } from "../entities/envioDto.interface";
import { Ruta } from "../entities/ruta.interface";
import { Transportista } from "../entities/transportista.interface";
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


  async buscarPorNumeroGuia(numeroGuia: string): Promise<Envio> {
    const envio = await this.envioRepository.buscarPorNumeroGuia(numeroGuia);
    if (!envio) {
      throw new Error(`No se encontró un envío con el número de guía: ${numeroGuia}`);
    }
    return envio;
  }


  async crearEnvio(envio: EnvioDto): Promise<EnvioDto> {
    const remitente =
      await this.usuarioRepository.buscarUsuarioPorIdentificacion(
        envio.cedula_remitente
      );
    console.log("remitenteid", remitente);
    let remitenteId: number;
    if (!remitente) {
      const remitenteNuevo = {
        nombre: envio.nombre_remitente || "Remitente", 
        apellido: envio.apellido_remitente || "Sin apellido",
        identificacion: envio.cedula_remitente,
        correo_electronico: this.generarCorreoAleatorio(
          envio.nombre_remitente,
          envio.apellido_remitente
        ),
        contrasena: "123456", 
        tipo_usuario_id: 2, 
        activo: 1,
        telefono: envio.telefono_destinatario, 
        fecha_creacion: new Date(),
        usuario_creacion: "API",
        fecha_modificacion: new Date(),
        usuario_modificacion: "API",
      };
      const usuarioCreado = await this.usuarioRepository.registrarUsuario(
        remitenteNuevo
      );
      console.log("remitente registrado", usuarioCreado);
      remitenteId = usuarioCreado.id;
    } else {
      remitenteId = remitente.id;
    }

    // Buscar destinatario
    const destinatario =
      await this.usuarioRepository.buscarUsuarioPorIdentificacion(
        envio.cedula_destinatario
      );
    console.log("destinatarioid", destinatario);
    let destinatarioId: number;
    if (!destinatario) {
      const destinatarioNuevo = {
 
        nombre: envio.nombre_destinatario || "Destinatario",
        apellido: envio.apellido_destinatario || "Sin apellido",
        identificacion: envio.cedula_destinatario,
        correo_electronico: this.generarCorreoAleatorio(
          envio.nombre_destinatario,
          envio.apellido_destinatario
        ),
        contrasena: "123456",
        tipo_usuario_id: 2,
        activo: 1,
        telefono: envio.telefono_destinatario, 
        fecha_creacion: new Date(),
        usuario_creacion: "API",
        fecha_modificacion: new Date(),
        usuario_modificacion: "API",
     
      };
      const usuarioCreado = await this.usuarioRepository.registrarUsuario(
        destinatarioNuevo
      );
      console.log("destinatario registrado", usuarioCreado);
      destinatarioId = usuarioCreado.id;
    } else {
      destinatarioId = destinatario.id;
    }
    const nuevoEnvio: Envio = {
      usuario_remitente_id: remitenteId,
      numero_guia: this.generarNumeroGuia(),
      usuario_destinatario_id: destinatarioId,
      cedula_remitente: envio.cedula_remitente,
      cedula_destinatario: envio.cedula_destinatario,
      direccion_envio: envio.direccion_envio,
      direccion_destino: envio.direccion_destino,
      telefono_remitente: envio.telefono_remitente,
      telefono_destinatario: envio.telefono_destinatario,
      peso: envio.peso,
      ancho: envio.ancho,
      alto: envio.alto,
      tipo_producto: envio.tipo_producto,
      estado: "En espera", 
      fecha_creacion: new Date(),
      usuario_creacion_id: envio.usuario_creacion_id,
    };

    // Insertar envío
    const envioCreado = await this.envioRepository.crearEnvio(nuevoEnvio);

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
  private generarNumeroGuia(): string {
    const prefijo = "GUIA";
    const timestamp = Date.now(); 
    const aleatorio = Math.floor(1000 + Math.random() * 9000); 
    return `${prefijo}-${timestamp}-${aleatorio}`;
  }

  async obtenerRuta(idRuta: number): Promise<Ruta> {
    return await this.envioRepository.obtenerRuta(idRuta);
  }
  async obtenerTransportista(idTransportista: number): Promise<Transportista> {
    return await this.envioRepository.obtenerTransportista(idTransportista);
  }
  async asignarRutaYTransportista(idEnvio: number, idRuta: number, idTransportista: number): Promise<Envio> {

    const envioActualizado = await this.envioRepository.actualizarEnvio(idEnvio, idRuta, idTransportista);

    return envioActualizado;
  }
}
