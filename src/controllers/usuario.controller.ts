import { Request, Response } from "express";
import { usuarioService } from "../services/usuario.service";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const users = await usuarioService.obtenerUsuarios();
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
    const existe = await usuarioService.buscarUsuarioPorIdentificacion(
      req.body.identificacion
    );
    const usuario = req.body;
    if (existe) {
      throw new Error("Ya existe un usuario con esa identificación.");
    }
    const hashedPassword = await bcrypt.hash(req.body.contrasena, SALT_ROUNDS);

    const nuevoUsuario = {
      ...usuario,
      contrasena: hashedPassword,
    };

    const user = await usuarioService.registrarUsuario(nuevoUsuario);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { correo_electronico, contrasena } = req.body;
  try {
 
    const result = await usuarioService.login(correo_electronico, contrasena);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
