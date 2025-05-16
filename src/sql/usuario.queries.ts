export const INSERT_USUARIO_QUERY = `
  INSERT INTO usuario
    (nombre, apellido, identificacion, correo_electronico, contrasena, tipo_usuario_id)
  VALUES ($1, $2, $3, $4, $5 ,$6)
  RETURNING *;
`;

export const SELECT_USUARIOS_QUERY = `
  SELECT * FROM usuario;
`;

export const BUSCAR_USUARIO_POR_IDENTIFICACION_QUERY = `SELECT * FROM usuario WHERE identificacion = $1`;
