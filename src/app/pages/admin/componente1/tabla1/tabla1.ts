export interface Tabla1 {
  id: number;
  varchar1?: string;
  varchar2?: string;
  varchar3?: string;
  varchar4?: string;
  varchar5?: string;
  varchar6?: string;
  varchar7?: string; // Esta puede contener la ruta de la imagen
  decimal1?: number;
  decimal2?: number;
  decimal3?: number;
  text1?: string;
  text2?: string;
  text3?: string;
  boolean1?: boolean;
  date1?: string; // Se puede representar como string para facilitar la manipulación de fechas
  time1?: string; // Representada como string
  categoria1_id?: number;
  created_at?: string;
  updated_at?: string;
}
