
export interface ApiResponse<T = any> {
  esExitoso: boolean;
  mensaje: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(mensaje: string, data?: T): ApiResponse<T> => ({
  esExitoso: true,
  mensaje,
  data,
});

export const errorResponse = (mensaje: string, error?: string): ApiResponse => ({
  esExitoso: false,
  mensaje,
  error,
});
