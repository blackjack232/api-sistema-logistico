import { Request, Response } from "express";
import {
  obtenerUsuarios as obtenerUsuariosService,
  registrarUsuarioService,
  loginService,
  buscarUsuarioPorIdentificacionService,
} from "../services/usuario.service";

export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const users = await obtenerUsuariosService();
    res.json({ ok: true, data: users });
  } catch (error) {
    console.error("Error in obtenerUsuarios:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const registrarUsuarioController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body.identificacion)
    const existe = await buscarUsuarioPorIdentificacionService(
      req.body.identificacion);
    if (existe) {
      throw new Error("Ya existe un usuario con esa identificación.");
    }
    const user = await registrarUsuarioService(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { correo_electronico, contrasena } = req.body;
  try {
    const result = await loginService(correo_electronico, contrasena);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
