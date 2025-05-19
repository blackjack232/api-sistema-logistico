import { NextFunction, Request, Response } from "express";
import { EnvioService } from "../services/envio.service";
import { successResponse, errorResponse } from "../utils/response";
import { EnvioDto } from "../entities/envioDto.interface";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class EnvioController {
  private readonly envioService: EnvioService;
  private readonly usuarioRepository: UsuarioRepository;

  constructor(
    envioService?: EnvioService,
    usuarioRepository?: UsuarioRepository
  ) {
    this.usuarioRepository = usuarioRepository ?? new UsuarioRepository();
    this.envioService =
      envioService ?? new EnvioService(this.usuarioRepository);
  }

  public crearEnvio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const datosEnvio: EnvioDto = req.body;
      const nuevoEnvio = await this.envioService.crearEnvio(datosEnvio);
      res
        .status(201)
        .json(successResponse("Envío creado correctamente", nuevoEnvio));
    } catch (error) {
      console.error("Error al crear el envío:", error);
      res
        .status(400)
        .json(
          errorResponse("No se pudo crear el envío", (error as Error).message)
        );
    }
  };
  public asignarRutaYTransportista = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { envioId, rutaId, transportistaId } = req.body;

      const ruta = await this.envioService.obtenerRuta(rutaId);
      const transportista = await this.envioService.obtenerTransportista(
        transportistaId
      );

      if (!ruta || ruta.disponible !== 1 || ruta.estado !== 1) {
        return res
          .status(400)
          .json(errorResponse("Ruta no disponible o inactiva."));
      }

      if (
        !transportista ||
        transportista.disponible !== 1 ||
        transportista.estado !== 1
      ) {
        return res
          .status(400)
          .json(errorResponse("Transportista no disponible o inactivo."));
      }

      const envioActualizado =
        await this.envioService.asignarRutaYTransportista(
          envioId,
          rutaId,
          transportistaId
        );
      res
        .status(200)
        .json(
          successResponse("Envío asignado correctamente.", envioActualizado)
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          errorResponse("Error al asignar envío.", (error as Error).message)
        );
    }
  };
  public rastrearEnvioPorGuia = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const numeroGuia = req.query.numero_guia as string;

      if (!numeroGuia) {
        return res.status(400).json(errorResponse("Número de guía requerido"));
      }

      const envio = await this.envioService.buscarPorNumeroGuia(numeroGuia);

      if (!envio) {
        return res.status(404).json(errorResponse("Envío no encontrado"));
      }

      res.status(200).json(successResponse("Envío encontrado", envio));
    } catch (error) {
      console.error("Error al rastrear el envío:", error);
      res
        .status(500)
        .json(
          errorResponse(
            "Error interno al rastrear el envío",
            (error as Error).message
          )
        );
    }
  };
  public obtenerEstadoActualEnvio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { numeroGuia } = req.params;
      const resultado = await this.envioService.obtenerEstadoActualEnvio(
        numeroGuia
      );
      res
        .status(200)
        .json(successResponse("Estado actual obtenido", resultado));
    } catch (error) {
      console.error("Error al obtener el estado:", error);
      res
        .status(404)
        .json(
          errorResponse(
            "No se encontró el estado del envío",
            (error as Error).message
          )
        );
    }
  };

  public cambiarEstadoEnvio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { numeroGuia } = req.params;
      const { nuevoEstado, usuarioModificacionId } = req.body;
      const resultado = await this.envioService.cambiarEstadoEnvio(
        numeroGuia,
        nuevoEstado,
        usuarioModificacionId
      );
      res
        .status(200)
        .json(successResponse("Estado actualizado correctamente", resultado));
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      res
        .status(400)
        .json(
          errorResponse(
            "No se pudo actualizar el estado",
            (error as Error).message
          )
        );
    }
  };

  public obtenerHistorialEstados = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { numeroGuia } = req.params;
      const historial = await this.envioService.obtenerHistorialEstados(
        numeroGuia
      );
      res
        .status(200)
        .json(successResponse("Historial de estados obtenido", historial));
    } catch (error) {
      console.error("Error al obtener historial:", error);
      res
        .status(404)
        .json(
          errorResponse("No se encontró el historial", (error as Error).message)
        );
    }
  };
}
