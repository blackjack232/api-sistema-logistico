import { Router } from "express";
import { EnvioController } from "../controllers/envio.controller";

const router = Router();
const envioController = new EnvioController();

// Ruta para crear un envío
router.post("/", envioController.crearEnvio);

export default router;
