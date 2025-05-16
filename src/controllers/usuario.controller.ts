import { Request, Response } from "express";
import { usuarioService } from "../services/usuario.service";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "../utils/response";

const SALT_ROUNDS = 10;

export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const users = await usuarioService.obtenerUsuarios();
    res.json(successResponse("Usuarios obtenidos correctamente", users));
  } catch (error) {
    console.error("Error in obtenerUsuarios:", error);
    res.status(500).json(errorResponse("Error interno del servidor", (error as Error).message));
  }
};

export const registrarUsuarioController = async (req: Request, res: Response) => {
  try {
    const existe = await usuarioService.buscarUsuarioPorIdentificacion(req.body.identificacion);
    if (existe) {
      throw new Error("Ya existe un usuario con esa identificación.");
    }

    const hashedPassword = await bcrypt.hash(req.body.contrasena, SALT_ROUNDS);
    const nuevoUsuario = {
      ...req.body,
      contrasena: hashedPassword,
    };

    const user = await usuarioService.registrarUsuario(nuevoUsuario);
    res.status(201).json(successResponse("Usuario registrado correctamente", user));
  } catch (err) {
    res.status(400).json(errorResponse("Error al registrar usuario", (err as Error).message));
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { correo_electronico, contrasena } = req.body;
  try {
    const result = await usuarioService.login(correo_electronico, contrasena);
    res.json(successResponse("Inicio de sesión exitoso", result));
  } catch (err) {
    res.status(401).json(errorResponse("Error al iniciar sesión", (err as Error).message));
  }
};
