export interface Tag {
  id: number;
  nombre: string;
  created_at: Date;
  updated_at: Date;
  //posts?: Post[]; // Relación opcional con los posts
}
