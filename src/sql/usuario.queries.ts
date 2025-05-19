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
  r.nombre
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

