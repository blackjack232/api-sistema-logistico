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
 *               usuario_creacion_id:
 *                 type: integer
 *                 example: 1
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

/**
 * @swagger
 * /envio/asignar-ruta:
 *   post:
 *     summary: Asignar ruta y transportista a un envío
 *     tags:
 *       - Envío
 *     security:
 *       - bearerAuth: []
 *     description: Asigna una ruta y un transportista a un envío existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - envio_id
 *               - ruta_id
 *               - transportista_id
 *             properties:
 *               envio_id:
 *                 type: integer
 *                 example: 1
 *               ruta_id:
 *                 type: integer
 *                 example: 5
 *               transportista_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Ruta y transportista asignados correctamente
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
 *                   example: Ruta y transportista asignados correctamente
 *                 data:
 *                   type: object
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/asignar-ruta",
  verificarToken,
  (req, res, next) => {
	Promise.resolve(envioController.asignarRutaYTransportista(req, res, next)).catch(next);
  }
);

/**
 * @swagger
* /envio/rastrear-envio:
 *   get:
 *     summary: Consultar envío por número de guía
 *     tags:
 *       - Envío
 *     security:
 *       - bearerAuth: []
 *     description: Consulta la información de un envío usando el número de guía.
 *     parameters:
 *       - in: query
 *         name: numero_guia
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de guía del envío a consultar
 *         example: "GUIA-123456"
 *     responses:
 *       200:
 *         description: Información del envío encontrada
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
 *                   example: Envío encontrado correctamente
 *                 data:
 *                   type: object
 *       400:
 *         description: Parámetro inválido o faltante
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/rastrear-envio', verificarToken, (req, res, next) => {
  Promise.resolve(envioController.rastrearEnvioPorGuia(req, res, next)).catch(next);
});

/**
 * @swagger
 * /envio/estado-actual/{numeroGuia}:
 *   get:
 *     summary: Consultar el estado actual de un envío
 *     tags:
 *       - Envío
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroGuia
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de guía del envío
 *     responses:
 *       200:
 *         description: Estado actual del envío
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "En tránsito"
 *       400:
 *         description: Parámetro inválido o faltante
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/estado-actual/:numeroGuia', verificarToken, envioController.obtenerEstadoActualEnvio);
/**
 * @swagger
 * /envio/actulizar-estado/{numeroGuia}:
 *   post:
 *     summary: Cambiar el estado de un envío
 *     tags:
 *       - Envío
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroGuia
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de guía del envío
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nuevoEstado
 *               - usuarioModificacionId
 *             properties:
 *               nuevoEstado:
 *                 type: string
 *                 example: "Entregado"
 *               usuarioModificacionId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Estado del envío actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 envioId:
 *                   type: integer
 *                   example: 1
 *                 nuevoEstado:
 *                   type: string
 *                   example: "Entregado"
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/actulizar-estado/:numeroGuia', verificarToken, envioController.cambiarEstadoEnvio);
/**
 * @swagger
 * /envio/historial/{numeroGuia}:
 *   get:
 *     summary: Consultar el historial de estados de un envío
 *     tags:
 *       - Envío
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroGuia
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de guía del envío
 *     responses:
 *       200:
 *         description: Historial de estados del envío
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   estado:
 *                     type: string
 *                     example: "En tránsito"
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-05-17T12:00:00Z"
 *       400:
 *         description: Parámetro inválido o faltante
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/historial/:numeroGuia', verificarToken, (req, res, next) => {
  Promise.resolve(envioController.obtenerHistorialEstados(req, res, next)).catch(next);
});
export default router;
