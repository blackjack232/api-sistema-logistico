import { Router } from "express";
import { EnvioController } from "../controllers/envio.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = Router();
const envioController = new EnvioController();

/**
 * @swagger
 * /envio:
 *   post:
 *     summary: Crear un nuevo envío
 *     tags:
 *       - Envío
 *     description: Crea un nuevo registro de envío en el sistema logístico.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_remitente
 *               - nombre_destinatario
 *               - apellido_remitente
 *               - apellido_destinatario
 *               - cedula_remitente
 *               - cedula_destinatario
 *               - telefono_remitente
 *               - telefono_destinatario
 *               - direccion_envio
 *               - direccion_destino
 *               - peso
 *               - usuario_creacion_id
 *             properties:
 *               nombre_remitente:
 *                 type: string
 *                 example: "Juan"
 *               nombre_destinatario:
 *                 type: string
 *                 example: "Pedro"
 *               apellido_remitente:
 *                 type: string
 *                 example: "Pérez"
 *               apellido_destinatario:
 *                 type: string
 *                 example: "Gómez"
 *               cedula_remitente:
 *                 type: string
 *                 example: "12345678"
 *               cedula_destinatario:
 *                 type: string
 *                 example: "87654321"
 *               telefono_remitente:
 *                 type: string
 *                 example: "3001234567"
 *               telefono_destinatario:
 *                 type: string
 *                 example: "3007654321"
 *               direccion_envio:
 *                 type: string
 *                 example: "Calle 1 # 23-45"
 *               direccion_destino:
 *                 type: string
 *                 example: "Carrera 7 # 89-10"
 *               peso:
 *                 type: number
 *                 example: 2.5
 *               ancho:
 *                 type: number
 *                 example: 30
 *               alto:
 *                 type: number
 *                 example: 15
 *               tipo_producto:
 *                 type: string
 *                 example: "Electrónicos"
 *               estado:
 *                 type: string
 *                 example: "En tránsito"
 *               fecha_creacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-05-17T12:00:00Z"
 *               fecha_modificacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-05-17T12:00:00Z"
 *               usuario_creacion_id:
 *                 type: integer
 *                 example: 1
 *               usuario_modificacion_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Envío creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 esExitoso:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Envío creado correctamente
 *                 data:
 *                   type: object
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", verificarToken ,envioController.crearEnvio);


export default router;
