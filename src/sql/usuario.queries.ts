export const INSERT_USUARIO_QUERY = `
  INSERT INTO usuario (
    nombre,
    apellido,
    identificacion,
    correo_electronico,
    contrasena,
    tipo_usuario_id,
    activo,
    telefono,
    fecha_creacion,
    usuario_creacion,
    fecha_modificacion,
    usuario_modificacion
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING *;
`;

export const SELECT_USUARIOS_QUERY = `
  SELECT 
    u.id,
    ro.nombre,
    ro.id as id_rol,   
    u.nombre AS nombre_usuario, 
    u.apellido AS apellido_usuario, 
    u.correo_electronico AS correo, 
    u.contrasena,
    u.activo
  FROM usuario u 
  JOIN rol ro ON u.tipo_usuario_id = ro.id
  WHERE u.correo_electronico = $1;
`;
export const OBTENER_USUARIOS_ACTIVOS = `
  SELECT 
  u.id,
  u.nombre,
  u.apellido,
  u.identificacion,
  u.correo_electronico,
  u.contrasena,
  u.tipo_usuario_id,
  u.activo,
  u.telefono,
  u.fecha_creacion,
  r.nombre AS nombre_rol
FROM usuario u
JOIN rol r ON u.tipo_usuario_id = r.id
WHERE u.activo = 1;
`;
export const BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY = `SELECT u.identificacion, u.id FROM usuario u WHERE identificacion = $1`;

export const INSERT_ENVIO_QUERY = `
  INSERT INTO envio (
    numero_guia,
    usuario_remitente_id,
    usuario_destinatario_id,
    cedula_remitente,
    cedula_destinatario,
    telefono_remitente,
    telefono_destinatario,
    direccion_envio,
    direccion_destino,
    peso,
    ancho,
    alto,
    tipo_producto,
    estado,
    fecha_creacion,
    fecha_modificacion,
    usuario_creacion_id,
    usuario_modificacion_id
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11, $12, $13, 
    $14, $15, $16, $17, $18
  )
  RETURNING *;
`;
export const BUSCAR_ENVIO_POR_NUMERO_GUIA_QUERY = `
  SELECT 
    id,
    numero_guia,
    usuario_remitente_id,
    usuario_destinatario_id,
    cedula_remitente,
    cedula_destinatario,
    direccion_envio,
    direccion_destino,
    telefono_remitente,
    telefono_destinatario,
    peso,
    ancho,
    alto,
    tipo_producto,
    estado,
    fecha_creacion,
    fecha_modificacion,
    usuario_creacion_id,
    usuario_modificacion_id
  FROM envio
  WHERE numero_guia = $1
`;

export const ACTUALIZAR_ENVIO_QUERY = `
      UPDATE envios
      SET ruta_id = $1, transportista_id = $2, fecha_modificacion = NOW()
      WHERE id = $3
      RETURNING *;
    `;
export const OBTENER_RUTA_QUERY = `SELECT * FROM rutas WHERE id = $1`;
export const OBTENER_TRANSPORTISTA_QUERY = `SELECT * FROM transportistas WHERE id = $1`;
export const OBTENER_ESTADO_ACTUAL_ENVIO_QUERY = `SELECT estado FROM envio WHERE numero_guia = $1`;
export const CAMBIAR_ESTADO_ENVIO_QUERY = `UPDATE envio
       SET estado = $1, fecha_modificacion = $2, usuario_modificacion_id = $3
       WHERE numero_guia = $4
       RETURNING id`;
export const INSERTAR_HISTORIAL_ESTADO_QUERY = `INSERT INTO envio_estado_historial (envio_id, estado, usuario_modificacion_id)
       VALUES ($1, $2, $3)`;

export const OBTENER_HISTORIAL_ESTADOS_QUERY = `SELECT h.estado, h.fecha, h.numero_guia
       FROM envio e
       JOIN envio_estado_historial h ON e.id = h.envio_id
       WHERE h.numero_guia = $1
       ORDER BY h.fecha ASC`;
