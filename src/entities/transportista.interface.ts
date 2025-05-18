export interface Transportista {
  id: number;
  nombre: string;
  identificacion: string;
  telefono?: string;
  correo_electronico?: string;
  placa_vehiculo: string;
  capacidad_vehiculo: number;
  estado: number;       // 1 = activo, 0 = inactivo
  disponible: number;   // 1 = disponible, 0 = no disponible
}