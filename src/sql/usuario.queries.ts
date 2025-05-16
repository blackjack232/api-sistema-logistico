export const INSERT_USUARIO_QUERY = `
  INSERT INTO usuario
    (nombre, apellido, identificacion, correo_electronico, contrasena, tipo_usuario_id)
  VALUES ($1, $2, $3, $4, $5 ,$6)
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


export const BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY = `SELECT u.identificacion FROM usuario u WHERE identificacion = $1`;
