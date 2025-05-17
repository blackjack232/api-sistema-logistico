import pool from "../config/database";
import { Envio } from "../entities/envio.interface";
import { IEnvioRepository } from "../interfaces/repository/IEnvioRepository .interface";
import { INSERT_ENVIO_QUERY } from "../sql/usuario.queries";

export class EnvioRepository implements IEnvioRepository {
  async crearEnvio(envio: Envio): Promise<Envio> {
    const values = [
      envio.numero_guia,
      envio.usuario_remitente_id,
      envio.usuario_destinatario_id,
      envio.cedula_remitente,
      envio.cedula_destinatario,
      envio.telefono_remitente,
      envio.telefono_destinatario,
      envio.direccion_envio,
      envio.direccion_destino,   
      envio.peso,
      envio.ancho ?? null,
      envio.alto ?? null,
      envio.tipo_producto ?? null,
      envio.estado ?? 'En espera',
      envio.fecha_creacion,
      envio.fecha_modificacion,
      envio.usuario_creacion_id,
      envio.usuario_modificacion_id
    ];
    const { rows } = await pool.query(INSERT_ENVIO_QUERY, values);
    return rows[0];
  }
}