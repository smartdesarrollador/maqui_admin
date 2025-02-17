import { Categoria } from './categoria';

// Interfaz base para artículo
export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: number;
  categoria?: Categoria;
  created_at: string;
  updated_at: string;
}
