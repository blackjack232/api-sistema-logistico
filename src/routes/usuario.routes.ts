import { Router } from 'express';
import { obtenerUsuarios, registrarUsuarioController, loginController } from '../controllers/usuario.controller';

const router = Router();
/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', obtenerUsuarios);

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo_electronico
 *               - contrasena
 *               - tipo_usuario_id
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               correo_electronico:
 *                 type: string
 *                 example: juan.perez@example.com
 *               contrasena:
 *                 type: string
 *                 example: contraseña123
 *               tipo_usuario_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */

router.post('/registro', registrarUsuarioController);

router.post('/login', loginController);

export default router;
