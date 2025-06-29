import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
const usuarioRepository = new UsuarioRepository();
const usuarioController = new UsuarioController(usuarioRepository);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         id_rol:
 *           type: number
 *         nombre_rol:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         apellido_usuario:
 *           type: string
 *         correo:
 *           type: string

 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', verificarToken, usuarioController.obtenerUsuarios);


/**
 * @swagger
 * /usuario/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - identificacion
 *               - correo_electronico
 *               - contrasena
 *               - tipo_usuario_id
 *               - activo
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               identificacion:
 *                 type: string
 *                 example: 123456789
 *               correo_electronico:
 *                 type: string
 *                 example: juan.perez@example.com
 *               contrasena:
 *                 type: string
 *                 example: contraseña123
 *               tipo_usuario_id:
 *                 type: integer
 *                 example: 1
 *               activo:
 *                 type: integer
 *                 example: 1
 *               telefono:
 *                 type: string
 *                 example: "3001234567"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/registro', usuarioController.registrarUsuarioController);
/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Usuario
 *     description: Permite a un usuario iniciar sesión con su correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo_electronico
 *               - contrasena
 *             properties:
 *               correo_electronico:
 *                 type: string
 *                 example: juan.pez@example.com
 *               contrasena:
 *                 type: string
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
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
 *                   example: Inicio de sesión exitoso
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', usuarioController.loginController);

export default router;
