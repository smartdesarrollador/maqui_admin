import { Articulo } from './articulo';

// Interfaz base para categoría
export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
  articulos?: Articulo[];
  total_articulos?: number;
  precio_promedio_articulos?: number | null;
}
