import { Envio } from '../../entities/envio.interface';
import { Ruta } from '../../entities/ruta.interface';
import { Transportista } from '../../entities/transportista.interface';

export interface IEnvioRepository {
  crearEnvio(envio: Envio): Promise<Envio>;
  obtenerRuta(idRuta: number): Promise<Ruta> ;
  obtenerTransportista(idTransportista: number): Promise<Transportista> ;
  actualizarEnvio(idEnvio: number, idRuta:number, idTransportista : number): Promise<Envio>;
  buscarPorNumeroGuia(numeroGuia: string): Promise<Envio | null>;
  obtenerEstadoActualEnvio(numeroGuia: string): Promise<{ estado: string }> ;
  cambiarEstadoEnvio(
    numeroGuia: string,
    nuevoEstado: string,
    usuarioModificacionId: number
  ): Promise<{ envioId: number; nuevoEstado: string }>
  obtenerHistorialEstados(numeroGuia: string): Promise<{ estado: string; fecha: string }[]>;
}