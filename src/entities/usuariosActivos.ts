export interface UsuarioActivo {
  id: number;
  nombre: string;
  apellido: string;
  identificacion : string;
  correo_electronico: string;
  contrasena: string;
  tipo_usuario_id: number;
  activo :number;
  telefono: string;
  fecha_creacion: Date;
  usuario_creacion: string;
  fecha_modificacion: Date;
  usuario_modificacion: string;
  nombre_rol: string;
}