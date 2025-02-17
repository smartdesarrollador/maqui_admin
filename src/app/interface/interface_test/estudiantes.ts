// Interfaz para la información del curso en la inscripción
interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  created_at: string;
  updated_at: string;
  inscripcion?: {
    fecha_inscripcion: string;
    calificacion: string;
  };
}

// Interfaz para un estudiante individual
export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  created_at: string;
  updated_at: string;
  cursos?: Curso[];
}

// Interfaz para la respuesta de listado de estudiantes
export interface EstudiantesResponse {
  data: Estudiante[];
}

// Interfaz para la respuesta de un solo estudiante
export interface EstudianteResponse {
  data: Estudiante;
}

// Interfaz para la respuesta de crear/actualizar estudiante
export interface EstudianteCrudResponse {
  message: string;
  data: Estudiante;
}

// Interfaz para la respuesta de eliminar estudiante
export interface EstudianteDeleteResponse {
  message: string;
}

// Interfaz para crear/actualizar estudiante (datos de entrada)
export interface EstudianteInput {
  nombre: string;
  email: string;
}

// Interfaz para los errores de validación
export interface ValidationError {
  message: string;
  error?: string;
}
