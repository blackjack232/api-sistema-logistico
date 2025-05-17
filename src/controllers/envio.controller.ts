import { Request, Response } from "express";
import { EnvioService } from "../services/envio.service";
import { successResponse, errorResponse } from "../utils/response";
import { EnvioDto} from "../entities/envioDto.interface";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class EnvioController {
  private readonly envioService: EnvioService;
  private readonly usuarioRepository : UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    this.envioService = new EnvioService(this.usuarioRepository);
  }

  public crearEnvio = async (req: Request, res: Response) => {
    try {
      const datosEnvio: EnvioDto = req.body;
      const nuevoEnvio = await this.envioService.crearEnvio(datosEnvio);
      res.status(201).json(successResponse("Envío creado correctamente", nuevoEnvio));
    } catch (error) {
      console.error("Error al crear el envío:", error);
      res.status(400).json(errorResponse("No se pudo crear el envío", (error as Error).message));
    }
  };

}
