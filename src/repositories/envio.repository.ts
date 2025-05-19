import pool from "../config/database";
import { Envio } from "../entities/envio.interface";
import { Ruta } from "../entities/ruta.interface";
import { Transportista } from "../entities/transportista.interface";
import { IEnvioRepository } from "../interfaces/repository/IEnvioRepository .interface";
import { INSERT_ENVIO_QUERY } from "../sql/usuario.queries";

export class EnvioRepository implements IEnvioRepository {
  async actualizarEnvio(idEnvio: number, idRuta: number, idTransportista: number): Promise<Envio> {
    const updateQuery = `
      UPDATE envios
      SET ruta_id = $1, transportista_id = $2, fecha_modificacion = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(updateQuery, [idRuta, idTransportista, idEnvio]);
    if (rows.length === 0) {
      throw new Error("Envío no encontrado");
    }
    return rows[0];
  }

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

  async obtenerRuta(idRuta: number): Promise<Ruta> {
    const query = 'SELECT * FROM rutas WHERE id = $1';
    const { rows } = await pool.query(query, [idRuta]);
    if (rows.length === 0) {
      throw new Error('Ruta no encontrada');
    }
    return rows[0];
  }

  async obtenerTransportista(idTransportista: number): Promise<Transportista> {
    const query = 'SELECT * FROM transportistas WHERE id = $1';
    const { rows } = await pool.query(query, [idTransportista]);
    if (rows.length === 0) {
      throw new Error('Transportista no encontrado');
    }
    return rows[0];
  }
}