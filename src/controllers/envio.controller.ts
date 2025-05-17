import { Request, Response } from "express";
import { EnvioService } from "../services/envio.service";
import { usuarioRepository } from "../repositories/usuario.repository";
import { successResponse, errorResponse } from "../utils/response";
import { EnvioDto} from "../entities/envioDto.interface";

export class EnvioController {
  private readonly envioService: EnvioService;

  constructor() {
    this.envioService = new EnvioService(usuarioRepository);
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
