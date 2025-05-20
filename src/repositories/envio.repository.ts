import pool from "../config/database";
import { Envio } from "../entities/envio.interface";
import { Ruta } from "../entities/ruta.interface";
import { Transportista } from "../entities/transportista.interface";
import { IEnvioRepository } from "../interfaces/repository/IEnvioRepository .interface";
import {
  ACTUALIZAR_ENVIO_QUERY,
  BUSCAR_ENVIO_POR_NUMERO_GUIA_QUERY,
  CAMBIAR_ESTADO_ENVIO_QUERY,
  INSERT_ENVIO_QUERY,
  INSERTAR_HISTORIAL_ESTADO_QUERY,
  OBTENER_ESTADO_ACTUAL_ENVIO_QUERY,
  OBTENER_HISTORIAL_ESTADOS_QUERY,
  OBTENER_RUTA_QUERY,
  OBTENER_TRANSPORTISTA_QUERY,
} from "../sql/usuario.queries";
import redisClient from "../config/redisClient";

const REDIS_PREFIX = "envio_estado:";
export class EnvioRepository implements IEnvioRepository {
  async buscarPorNumeroGuia(numeroGuia: string): Promise<Envio | null> {
    const { rows } = await pool.query(BUSCAR_ENVIO_POR_NUMERO_GUIA_QUERY, [
      numeroGuia,
    ]);
    return rows[0] ?? null;
  }

  async actualizarEnvio(
    idEnvio: number,
    idRuta: number,
    idTransportista: number
  ): Promise<Envio> {
    const updateQuery = ACTUALIZAR_ENVIO_QUERY;
    const { rows } = await pool.query(updateQuery, [
      idRuta,
      idTransportista,
      new Date(),
      idEnvio,
    ]);
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
      envio.estado ?? "En espera",
      envio.fecha_creacion,
      envio.fecha_modificacion,
      envio.usuario_creacion_id,
      envio.usuario_modificacion_id,
    ];
    const { rows } = await pool.query(INSERT_ENVIO_QUERY, values);
    return rows[0];
  }

  async obtenerRuta(idRuta: number): Promise<Ruta> {
    const query = OBTENER_RUTA_QUERY;
    console.log("ID Ruta:", idRuta);
    const { rows } = await pool.query(query, [idRuta]);
    console.log("Rows:", rows[0]);
    if (rows.length === 0) {
      throw new Error("Ruta no encontrada");
    }
    return rows[0];
  }

  async obtenerTransportista(idTransportista: number): Promise<Transportista> {
    const query = OBTENER_TRANSPORTISTA_QUERY;
    const { rows } = await pool.query(query, [idTransportista]);
    if (rows.length === 0) {
      throw new Error("Transportista no encontrado");
    }
    return rows[0];
  }
  async obtenerEstadoActualEnvio(
    numeroGuia: string
  ): Promise<{ estado: string }> {
    const redisKey = `${REDIS_PREFIX}${numeroGuia}`;
    const estadoCache = await redisClient.get(redisKey);

    if (estadoCache) return { estado: estadoCache };

    const result = await pool.query(OBTENER_ESTADO_ACTUAL_ENVIO_QUERY, [
      numeroGuia,
    ]);

    const estado = result.rows[0]?.estado ?? "No encontrado";
    await redisClient.setEx(redisKey, 600, estado); // 10 minutos

    return { estado };
  }

  async cambiarEstadoEnvio(
    numeroGuia: string,
    nuevoEstado: string,
    usuarioModificacionId: number
  ): Promise<{ envioId: number; nuevoEstado: string }> {
    const result = await pool.query(CAMBIAR_ESTADO_ENVIO_QUERY, [
      nuevoEstado,
      new Date(),
      usuarioModificacionId,
      numeroGuia,
    ]);

    const envioId = result.rows[0]?.id;
    if (!envioId) throw new Error("Envío no encontrado");

    // Actualizamos Redis cache
    await redisClient.setEx(`${REDIS_PREFIX}${numeroGuia}`, 600, nuevoEstado);

    // Insertamos historial
    await pool.query(INSERTAR_HISTORIAL_ESTADO_QUERY, [
      envioId,
      nuevoEstado,
      usuarioModificacionId,
    ]);

    // Publicamos en Redis canal 'envio_cambios' para que Socket.IO notifique al front
    const mensaje = JSON.stringify({ envioId, numeroGuia, nuevoEstado });
    await redisClient.publish("envio_cambios", mensaje);

    return { envioId, nuevoEstado };
  }

  async obtenerHistorialEstados(
    numeroGuia: string
  ): Promise<{ estado: string; fecha: string; numero_guia: string }[]> {
    const result = await pool.query(OBTENER_HISTORIAL_ESTADOS_QUERY, [
      numeroGuia,
    ]);

    return result.rows;
  }
}
