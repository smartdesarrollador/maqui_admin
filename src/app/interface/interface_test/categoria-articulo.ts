// Interfaz para artículos dentro de categoría
export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  categoria_id: number;
  created_at: string;
  updated_at: string;
}

// Interfaz para la estructura base de una categoría
export interface CategoriaArticulo {
  id: number;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  articulos: Articulo[];
  total_articulos: number;
  precio_promedio_articulos: number | null;
}

// Interfaz para la respuesta de listado de categorías (GET /categoria_articulos)
export interface CategoriaArticuloResponse {
  status: 'success';
  data: CategoriaArticulo[];
}

// Interfaz para la respuesta de una sola categoría (GET /categoria_articulos/{id})
export interface SingleCategoriaResponse {
  status: 'success';
  data: CategoriaArticulo;
}

// Interfaz para crear/actualizar categoría (POST, PUT)
export interface CategoriaArticuloForm {
  nombre: string;
  descripcion: string;
}

// Interfaz para la respuesta al crear/actualizar (POST, PUT)
export interface CategoriaCreateUpdateResponse {
  status: 'success';
  message: string;
  data: CategoriaArticulo;
}

// Interfaz para la respuesta al eliminar (DELETE)
export interface DeleteResponse {
  status: 'success';
  message: string;
}

// Interfaz para respuestas de error
export interface ErrorResponse {
  status: 'error';
  message: string;
  error?: string;
  errors?: Record<string, string[]>; // Para errores de validación
  total_articulos?: number; // Para error al eliminar con artículos
  precio_promedio?: number; // Para error al eliminar con artículos
}
