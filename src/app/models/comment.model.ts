export interface Comment {
  id: number;
  id_articulo: number; // Clave foránea de post
  nombre_comentarista: string;
  contenido: string;
  fecha_comentario: Date;
  created_at: Date;
  updated_at: Date;
  //post?: Post; // Relación opcional con el post
}
