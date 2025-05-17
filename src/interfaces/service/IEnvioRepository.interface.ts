import { EnvioDto } from "../../entities/envioDto.interface";



export interface IEnvioService {
  crearEnvio(envio: EnvioDto): Promise<EnvioDto>;
}
