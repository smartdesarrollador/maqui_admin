export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'autor' | 'administrador'; // Rol del usuario
  created_at: Date;
  updated_at: Date;
  //posts?: Post[]; // Relación opcional con los posts
}
