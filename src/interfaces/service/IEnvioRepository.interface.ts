import { Envio } from "../../entities/envio.interface";
import { EnvioDto } from "../../entities/envioDto.interface";
import { Ruta } from "../../entities/ruta.interface";
import { Transportista } from "../../entities/transportista.interface";

export interface IEnvioService {
  crearEnvio(envio: EnvioDto): Promise<EnvioDto>;
  obtenerRuta(idRuta: number): Promise<Ruta>;
  obtenerTransportista(idTransportista: number): Promise<Transportista>;
  asignarRutaYTransportista(idEnvio: number, idRuta: number, idTransportista: number): Promise<Envio>;
  buscarPorNumeroGuia(numeroGuia: string): Promise<Envio>;
   obtenerEstadoActualEnvio(numeroGuia: string): Promise<{ estado: string }>;
  cambiarEstadoEnvio(
    numeroGuia: string,
    nuevoEstado: string,
    usuarioModificacionId: number
  ): Promise<{ envioId: number; nuevoEstado: string }>;
  obtenerHistorialEstados(
    numeroGuia: string
  ): Promise<{ estado: string; fecha: string }[]>;
}
