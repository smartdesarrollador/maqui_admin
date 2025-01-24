import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
/* import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; */
/*  1 - Quill */
import { QuillModule } from 'ngx-quill';
/*  /1 - Quill  */

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    /* CKEditorModule, */
    /*  2 - Quill */
    QuillModule,
    /*  2 - Quill */
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  listCategories: any = [];
  files_date: any;
  files_date_pdf: any;
  submitted = false;
  data: any;
  form: FormGroup = new FormGroup({});
  urlRaiz = environment.urlRaiz + '/';
  valor_id_producto: any;
  categoriaProductoId: any = 1;
  /* public Editor = ClassicEditor; */
  valor_destacado: any;
  post = new Producto();
  currentImageUrl: string | null = null;
  currentImageUrlPdf: string | null = null;

  htmlContent: any;

  moduleQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'], // link and image, video
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private dataService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();

    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      this.valor_id_producto = categoryId;
      this.loadCurrentPdf(categoryId);
    });
    this.valor_destacado = this.dataService.selectCategory.destacado;
  }

  onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  loadCategories() {
    return this.dataService.getCategories().subscribe((data: {}) => {
      console.log(data);
      this.listCategories = data;
    });
  }

  loadCurrentPdf(id: any) {
    // Asumiendo que tienes un método en tu servicio para obtener los detalles del testimonio
    this.dataService.getProductoId(id).subscribe((informativo: any) => {
      if (informativo && informativo.imagen) {
        this.currentImageUrl = this.urlRaiz + informativo.ruta_imagen;
      }
      if (informativo && informativo.pdf) {
        this.currentImageUrlPdf = this.urlRaiz + informativo.ruta_pdf;
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: [this.dataService.selectCategory.nombre, Validators.required],
      resumen: [this.dataService.selectCategory.resumen, Validators.required],
      descripcion: [
        this.dataService.selectCategory.descripcion,
        Validators.required,
      ],
      /* duracion: [this.dataService.selectCategory.duracion, Validators.required], */
      image: [null],
      /* pdf: [null], */
      /* maestro: [this.dataService.selectCategory.maestro, Validators.required], */
      /* observacion: [
        this.dataService.selectCategory.observacion,
        Validators.required,
      ], */
      /*  precio: [this.dataService.selectCategory.precio, Validators.required], */
      destacado: [
        this.dataService.selectCategory.destacado == 'true' ? true : false,
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files && event.target.files.length > 0) {
        const files = event.target.files[0];
        this.files_date = files;
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (files.size > maxSizeInBytes) {
          console.log('La imagen excede el tamaño máximo permitido (5MB)');
          this.alertaMaxFile();
          // Puedes mostrar un mensaje de error o realizar otra acción
          event.target.value = ''; // Limpiar el input file
          return;
        }

        if (!['image/jpeg', 'image/png'].includes(files.type)) {
          console.log('Solo se permiten archivos JPG y PNG');
          this.alertaExtFile();
          // Puedes mostrar un mensaje de error o realizar otra acción
          event.target.value = ''; // Limpiar el input file
          return;
        }

        // Aquí puedes continuar con el proceso de carga de la imagen
        console.log('Archivo seleccionado:', files);
      } else {
        console.log('No se seleccionó ningún archivo');
      }
    }
  }

  uploadImagePdf(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files && event.target.files.length > 0) {
        const filesPdf = event.target.files[0];
        this.files_date_pdf = filesPdf;
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (filesPdf.size > maxSizeInBytes) {
          console.log('La imagen excede el tamaño máximo permitido (5MB)');
          this.alertaMaxFilePdf();
          // Puedes mostrar un mensaje de error o realizar otra acción
          event.target.value = ''; // Limpiar el input file
          return;
        }

        if (filesPdf.type !== 'application/pdf') {
          console.log('Solo se permiten archivos PDF');
          this.alertaExtFilePdf();
          // Puedes mostrar un mensaje de error o realizar otra acción
          event.target.value = ''; // Limpiar el input file
          return;
        }

        // Aquí puedes continuar con el proceso de carga de la imagen
        console.log('Archivo seleccionado:', filesPdf);
      } else {
        console.log('No se seleccionó ningún archivo');
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    /*  if (this.form.invalid) {
      return;
    } */

    const formData = new FormData();
    formData.append('id_producto', this.valor_id_producto);
    formData.append('nombre', this.form.value.nombre);
    formData.append('resumen', this.form.value.resumen);
    formData.append('descripcion', this.form.value.descripcion);
    formData.append('duracion', this.form.value.duracion);

    if (this.files_date) {
      formData.append('imagen', this.files_date, this.files_date.name);
    }

    if (this.files_date_pdf) {
      formData.append('pdf', this.files_date_pdf, this.files_date_pdf.name);
    }
    formData.append('maestro', this.form.value.maestro);
    formData.append('observacion', this.form.value.observacion);
    formData.append('precio', this.form.value.precio);
    formData.append('destacado', this.form.value.destacado);
    formData.append('categoria_producto_id', this.categoriaProductoId);

    this.dataService.updateData(formData).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.alerta();
      this.router.navigate(['/admin/servicio1']);
    });
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro editado',
    });
  }

  alertaMaxFile() {
    Swal.fire({
      icon: 'error',
      title: 'La imagen excede el tamaño máximo permitido (5MB)',
    });
  }

  alertaExtFile() {
    Swal.fire({
      icon: 'error',
      title: 'Solo se permiten archivos JPG y PNG',
    });
  }

  alertaMaxFilePdf() {
    Swal.fire({
      icon: 'error',
      title: 'El pdf excede el tamaño máximo permitido (5MB)',
    });
  }

  alertaExtFilePdf() {
    Swal.fire({
      icon: 'error',
      title: 'Solo se permiten archivos Pdf',
    });
  }
}
