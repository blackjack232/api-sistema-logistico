
import { Envio } from '../../entities/envioDto.interface';

export interface IEnvioService {
  crearEnvio(envio: Envio): Promise<Envio>;
}
