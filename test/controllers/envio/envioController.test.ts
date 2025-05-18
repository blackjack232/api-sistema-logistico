import { EnvioController } from "../../../src/controllers/envio.controller";
import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../../../src/utils/response";
import { EnvioService } from "../../../src/services/envio.service";
import { UsuarioRepository } from "../../../src/repositories/usuario.repository";

class EnvioControllerTestHelper {
  envioController: EnvioController;
  mockEnvioService: Partial<EnvioService>;
  mockUsuarioRepository: Partial<UsuarioRepository>;
  mockReq: Partial<Request>;
  mockRes: Partial<Response>;
  mockNext: NextFunction;

  constructor() {
    this.mockEnvioService = {
      crearEnvio: jest.fn(),
    };
    this.mockUsuarioRepository = {};
    this.mockReq = {
      body: { destino: "Calle 123", peso: 5 },
    };
    this.mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response> as Response;
    this.mockNext = jest.fn();
    this.envioController = new EnvioController(
      this.mockEnvioService as EnvioService,
      this.mockUsuarioRepository as UsuarioRepository
    );
  }

  resetMocks() {
    jest.resetAllMocks();
  }
}

describe("EnvioController", () => {
  let helper: EnvioControllerTestHelper;

  beforeEach(() => {
    helper = new EnvioControllerTestHelper();
  });

  afterEach(() => {
    helper.resetMocks();
  });

  it("debe responder 201 y mensaje de éxito cuando crearEnvio funciona", async () => {
    const nuevoEnvio = { id: 1, destino: "Calle 123", peso: 5 };
    (helper.mockEnvioService.crearEnvio as jest.Mock).mockResolvedValue(nuevoEnvio);

    await helper.envioController.crearEnvio(
      helper.mockReq as Request,
      helper.mockRes as Response,
      helper.mockNext
    );

    expect(helper.mockEnvioService.crearEnvio).toHaveBeenCalledWith(helper.mockReq.body);
    expect(helper.mockRes.status).toHaveBeenCalledWith(201);
    expect(helper.mockRes.json).toHaveBeenCalledWith(
      successResponse("Envío creado correctamente", nuevoEnvio)
    );
  });

  it("debe responder 400 y mensaje de error cuando crearEnvio lanza excepción", async () => {
    const errorMsg = "Error en creación";
    (helper.mockEnvioService.crearEnvio as jest.Mock).mockRejectedValue(new Error(errorMsg));

    await helper.envioController.crearEnvio(
      helper.mockReq as Request,
      helper.mockRes as Response,
      helper.mockNext
    );

    expect(helper.mockRes.status).toHaveBeenCalledWith(400);
    expect(helper.mockRes.json).toHaveBeenCalledWith(
      errorResponse("No se pudo crear el envío", errorMsg)
    );
  });
});