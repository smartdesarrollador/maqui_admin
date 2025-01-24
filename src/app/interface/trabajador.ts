export interface Trabajador {
    id_trabajador?: number;
    trabajador?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    primer_nombre?: string;
    segundo_nombre?: string;
    numero_documento?: string;
    fecha_nacimiento?: string;
    ruc?: string;
    direccion?: string;
    referencia?: string;
    telefono?: string;
    celular?: string;
    correo?: string;
    id_empleador?: number;
    id_tipo_contrato?: number;
    fecha_estado?: string;
    id_afp?: number;
    cuspp?: string;
    es_discapacitado?: string;
    es_sindicalizado?: string;
    fecha_ingreso?: string;
    fecha_egreso?: string;
    fecha_baja?: string;
    created_at?: string;
    updated_at?: string;
}
