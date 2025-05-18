import { Envio } from '../../entities/envio.interface';
import { Ruta } from '../../entities/ruta.interface';
import { Transportista } from '../../entities/transportista.interface';

export interface IEnvioRepository {
  crearEnvio(envio: Envio): Promise<Envio>;
  obtenerRuta(idRuta: number): Promise<Ruta> ;
  obtenerTransportista(idTransportista: number): Promise<Transportista> ;
  actualizarEnvio(idEnvio: number, idRuta:number, idTransportista : number): Promise<Envio>;
}