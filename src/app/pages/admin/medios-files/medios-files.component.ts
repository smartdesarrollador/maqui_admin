import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedioFileService } from '../../../services/medios/medio-file.service';
import { MedioCategoriaService } from '../../../services/medios/medio-categoria.service';

interface MediaFile {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  extension: string;
  width: number | null;
  height: number | null;
  duration: number | null;
  description: string | null;
  alt_text: string | null;
  title: string;
  is_public: boolean;
  sort_order: number;
  category_id: number | null;
  uploaded_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category?: {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    is_active: boolean;
    sort_order: number;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  uploader?: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    rol: string;
    created_at: string | null;
    updated_at: string | null;
  };
}

@Component({
  selector: 'app-medios-files',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './medios-files.component.html',
  styleUrl: './medios-files.component.css',
})
export class MediosFilesComponent implements OnInit {
  protected readonly Math = Math;
  protected readonly Array = Array;
  readonly medioFileService = inject(MedioFileService);
  private readonly medioCategoriaService = inject(MedioCategoriaService);

  archivos: MediaFile[] = [];
  categorias: any[] = [];
  cargando = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  // Parámetros de búsqueda y paginación
  busqueda = '';
  categoriaSeleccionada: number | null = null;
  tipoArchivo = '';
  paginaActual = 1;
  porPagina = 12;
  totalItems = 0;
  ordenarPor = 'created_at';
  ordenDireccion: 'asc' | 'desc' = 'desc';

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarArchivos();
  }

  cargarCategorias(): void {
    this.medioCategoriaService.listarCategorias().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.categorias = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.mostrarMensaje('Error al cargar las categorías', 'error');
      },
    });
  }

  cargarArchivos(): void {
    this.cargando = true;
    this.medioFileService
      .listarArchivos({
        page: this.paginaActual,
        per_page: this.porPagina,
        search: this.busqueda || undefined,
        category_id: this.categoriaSeleccionada || undefined,
        file_type: this.tipoArchivo || undefined,
        sort_by: this.ordenarPor,
        sort_direction: this.ordenDireccion,
      })
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.archivos = response.data?.data || [];
            this.totalItems = response.meta?.total || 0;
            this.paginaActual = response.meta?.current_page || 1;
          }
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar archivos:', error);
          this.mostrarMensaje('Error al cargar los archivos', 'error');
          this.cargando = false;
        },
      });
  }

  buscar(): void {
    this.paginaActual = 1;
    this.cargarArchivos();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cargarArchivos();
  }

  cambiarOrden(campo: string): void {
    if (this.ordenarPor === campo) {
      this.ordenDireccion = this.ordenDireccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenarPor = campo;
      this.ordenDireccion = 'asc';
    }
    this.cargarArchivos();
  }

  copiarRuta(archivo: MediaFile): void {
    const url = this.medioFileService.obtenerUrlArchivo(archivo.file_path);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        this.mostrarMensaje('URL copiada al portapapeles', 'success');
      })
      .catch(() => {
        this.mostrarMensaje('Error al copiar la URL', 'error');
      });
  }

  formatearTamano(bytes: number): string {
    return this.medioFileService.formatearTamano(bytes);
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 3000);
  }

  generatePageArray(): number[] {
    return Array.from(
      { length: Math.ceil(this.totalItems / this.porPagina) },
      (_, i) => i + 1
    );
  }

  crearMedio(): void {
    // TODO: Implementar lógica para crear medio
    console.log('Crear nuevo medio');
  }

  editarMedio(archivo: MediaFile): void {
    // TODO: Implementar lógica para editar medio
    console.log('Editar medio:', archivo);
  }
}
