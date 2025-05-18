
export interface Ruta {
  id: number;
  nombre: string;
  descripcion?: string;
  capacidad_maxima: number;
  estado: number;       // 1 = activa, 0 = inactiva
  disponible: number;   // 1 = disponible, 0 = no disponible
}
