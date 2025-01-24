import { Category } from './category.model'; // Importa el modelo de categorías

export interface Post {
  id?: number;
  titulo?: string;
  contenido?: string;
  id_autor?: number;
  estado?: 'publicado' | 'borrador';
  imagen?: string;
  ruta_imagen?: string;
  fecha_publicacion?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  comentarios?: Comment[];
  categorias?: Category[]; // Asegúrate de que categorías sea un arreglo de Category
}
