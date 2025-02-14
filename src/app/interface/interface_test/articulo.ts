export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: number;
  categoria?: {
    id: number;
    nombre: string;
    descripcion: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ArticuloResponse {
  data: Articulo;
}

export interface ArticulosResponse {
  data: Articulo[];
}

export interface ArticuloMensaje {
  message: string;
}
