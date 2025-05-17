import { Envio } from '../../entities/envio.interface';

export interface IEnvioRepository {
  crearEnvio(envio: Envio): Promise<Envio>;
}