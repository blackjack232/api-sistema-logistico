
export interface Envio {
  id?: number;
  numero_guia :string;
  usuario_remitente_id: number;
  usuario_destinatario_id: number;
  cedula_remitente: string;
  cedula_destinatario: string;
  direccion_envio: string;
  direccion_destino: string;
  telefono_remitente :string;
  telefono_destinatario: string;
  peso: number;
  ancho?: number;
  alto?: number;
  tipo_producto?: string;
  estado?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
  usuario_creacion_id: number;
  usuario_modificacion_id?: number;
}
