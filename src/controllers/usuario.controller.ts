
import { Request, Response } from "express";
import { UsuarioService} from "../services/usuario.service";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "../utils/response";
import { IUsuarioRepository } from "../interfaces/repository/IUsuarioRepository.interface";

const SALT_ROUNDS = 10;

export class UsuarioController {
  private readonly usuarioService: UsuarioService;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioService = new UsuarioService(usuarioRepository);
  }

  obtenerUsuarios = async (_req: Request, res: Response) => {
    try {
      const users = await this.usuarioService.obtenerUsuarios();
      res.json(successResponse("Usuarios obtenidos correctamente", users));
    } catch (error) {
      console.error("Error in obtenerUsuarios:", error);
      res.status(500).json(errorResponse("Error interno del servidor", (error as Error).message));
    }
  };

  registrarUsuarioController = async (req: Request, res: Response) => {
    try {
      const existe = await this.usuarioService.buscarUsuarioPorIdentificacion(req.body.identificacion);
      if (existe) {
        throw new Error("Ya existe un usuario con esa identificación.");
      }
      console.log("Registrar usuario:", req.body);
      const hashedPassword = await bcrypt.hash(req.body.contrasena, SALT_ROUNDS);
      const nuevoUsuario = {
        ...req.body,
        contrasena: hashedPassword,
      };

      const user = await this.usuarioService.registrarUsuario(nuevoUsuario);
      res.status(201).json(successResponse("Usuario registrado correctamente", user));
    } catch (err) {
      res.status(400).json(errorResponse("Error al registrar usuario", (err as Error).message));
    }
  };

  loginController = async (req: Request, res: Response) => {
    const { correo_electronico, contrasena } = req.body;
    try {
      console.log("Login usuario:", req.body);
      const result = await this.usuarioService.login(correo_electronico, contrasena);
      res.json(successResponse("Inicio de sesión exitoso", result));
    } catch (err) {
      res.status(401).json(errorResponse("Error al iniciar sesión", (err as Error).message));
    }
  };
}