// Interfaz para metadatos de paginación
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Interfaz para links de paginación
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

// Interfaz para metadatos adicionales
export interface MetaData {
  timestamp?: string;
  server_id?: string;
  execution_time?: number;
  [key: string]: any; // Para metadatos adicionales dinámicos
}

// Interfaz para errores de validación
export interface ValidationErrors {
  [key: string]: string[];
}

// Interfaz base para todas las respuestas
export interface ApiResponse<T> {
  status: 'success' | 'error' | 'warning';
  message?: string;
  data?: T;
  meta?: MetaData;
  pagination?: {
    meta: PaginationMeta;
    links: PaginationLinks;
  };
  errors?: {
    code?: string;
    message?: string;
    details?: string;
    validation?: ValidationErrors;
    trace?: string[];
  };
}

// Type para respuestas paginadas
export type PaginatedResponse<T> = ApiResponse<T> & {
  pagination: {
    meta: PaginationMeta;
    links: PaginationLinks;
  };
};

// Type para respuestas de error
export type ErrorResponse = ApiResponse<null> & {
  status: 'error';
  errors: {
    code: string;
    message: string;
    details?: string;
    validation?: ValidationErrors;
  };
};

// Type para respuestas exitosas
export type SuccessResponse<T> = ApiResponse<T> & {
  status: 'success';
  data: T;
};
