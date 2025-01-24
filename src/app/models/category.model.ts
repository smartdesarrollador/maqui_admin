export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
  created_at: Date;
  updated_at: Date;
  //posts?: Post[]; // Relación opcional con los posts
}
