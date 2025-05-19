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
}
