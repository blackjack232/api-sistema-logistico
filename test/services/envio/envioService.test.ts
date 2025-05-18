import { EnvioService } from "../../../src/services/envio.service";
import { EnvioDto } from "../../../src/entities/envioDto.interface";

class EnvioServiceTestHelper {
  mockEnvioRepository: any;
  mockUsuarioRepository: any;
  envioService: EnvioService;

  constructor() {
    this.mockEnvioRepository = {
      crearEnvio: jest.fn(),
    };
    this.mockUsuarioRepository = {
      buscarUsuarioPorIdentificacion: jest.fn(),
      registrarUsuario: jest.fn(),
    };
    // @ts-ignore
    this.envioService = new EnvioService(this.mockUsuarioRepository);
    // @ts-ignore
    this.envioService.envioRepository = this.mockEnvioRepository;
  }

  resetMocks() {
    jest.resetAllMocks();
  }
}

describe("EnvioService", () => {
  let helper: EnvioServiceTestHelper;

  beforeEach(() => {
    helper = new EnvioServiceTestHelper();
  });

  afterEach(() => {
    helper.resetMocks();
  });

  it("debería crear un envío con usuarios nuevos", async () => {
    helper.mockUsuarioRepository.buscarUsuarioPorIdentificacion
      .mockResolvedValueOnce(null) // remitente
      .mockResolvedValueOnce(null); // destinatario
    helper.mockUsuarioRepository.registrarUsuario
      .mockResolvedValueOnce({ id: 10 }) // remitente creado
      .mockResolvedValueOnce({ id: 20 }); // destinatario creado

    const envioCreado = { id: 1, numero_guia: "GUIA-123", usuario_remitente_id: 10, usuario_destinatario_id: 20 };
    helper.mockEnvioRepository.crearEnvio.mockResolvedValue(envioCreado);

    const envioDto: EnvioDto = {
      nombre_remitente: "Juan",
      apellido_remitente: "Perez",
      cedula_remitente: "111",
      telefono_remitente: "3001234567",
      nombre_destinatario: "Ana",
      apellido_destinatario: "Gomez",
      cedula_destinatario: "222",
      telefono_destinatario: "3007654321",
      direccion_envio: "Calle 1",
      direccion_destino: "Calle 2",
      peso: 2,
      usuario_creacion_id: 1,
    };

    const result = await helper.envioService.crearEnvio(envioDto);

    expect(helper.mockUsuarioRepository.buscarUsuarioPorIdentificacion).toHaveBeenCalledTimes(2);
    expect(helper.mockUsuarioRepository.registrarUsuario).toHaveBeenCalledTimes(2);
    expect(helper.mockEnvioRepository.crearEnvio).toHaveBeenCalled();
    
    expect(result.nombre_remitente).toBe("Juan");
    expect(result.nombre_destinatario).toBe("Ana");
  });

  it("debería crear un envío con usuarios existentes", async () => {
    helper.mockUsuarioRepository.buscarUsuarioPorIdentificacion
      .mockResolvedValueOnce({ id: 11 }) // remitente existe
      .mockResolvedValueOnce({ id: 22 }); // destinatario existe

    const envioCreado = { id: 2, numero_guia: "GUIA-456", usuario_remitente_id: 11, usuario_destinatario_id: 22 };
    helper.mockEnvioRepository.crearEnvio.mockResolvedValue(envioCreado);

    const envioDto: EnvioDto = {
      nombre_remitente: "Carlos",
      apellido_remitente: "Lopez",
      cedula_remitente: "333",
      telefono_remitente: "3000000000",
      nombre_destinatario: "Maria",
      apellido_destinatario: "Diaz",
      cedula_destinatario: "444",
      telefono_destinatario: "3009999999",
      direccion_envio: "Calle 3",
      direccion_destino: "Calle 4",
      peso: 3,
      usuario_creacion_id: 2,
    };

    const result = await helper.envioService.crearEnvio(envioDto);

    expect(helper.mockUsuarioRepository.buscarUsuarioPorIdentificacion).toHaveBeenCalledTimes(2);
    expect(helper.mockUsuarioRepository.registrarUsuario).not.toHaveBeenCalled();
    expect(helper.mockEnvioRepository.crearEnvio).toHaveBeenCalled();
    expect(result.nombre_remitente).toBe("Carlos");
    expect(result.nombre_destinatario).toBe("Maria");
  });

  it("debería lanzar error si el repositorio falla", async () => {
    helper.mockUsuarioRepository.buscarUsuarioPorIdentificacion.mockRejectedValue(new Error("DB error"));

    const envioDto: EnvioDto = {
      nombre_remitente: "Juan",
      apellido_remitente: "Perez",
      cedula_remitente: "111",
      telefono_remitente: "3001234567",
      nombre_destinatario: "Ana",
      apellido_destinatario: "Gomez",
      cedula_destinatario: "222",
      telefono_destinatario: "3007654321",
      direccion_envio: "Calle 1",
      direccion_destino: "Calle 2",
      peso: 2,
      usuario_creacion_id: 1,
    };

    await expect(helper.envioService.crearEnvio(envioDto)).rejects.toThrow("DB error");
  });
});