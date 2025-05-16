import { obtenerUsuarios as obtenerUsuariosRepository} from '../repositories/usuario.repository';

export const obtenerUsuarios = async () => {
  return await obtenerUsuariosRepository();
};
