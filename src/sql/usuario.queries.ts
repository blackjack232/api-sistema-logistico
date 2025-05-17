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
    u.nombre AS nombre_usuario, 
    u.apellido AS apellido_usuario, 
    u.identificacion, 
    u.correo_electronico AS correo, 
    u.contrasena,
    u.tipo_usuario_id 
  FROM usuario u 
  WHERE u.correo_electronico = $1;
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

