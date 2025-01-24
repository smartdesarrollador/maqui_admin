import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
/* import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; */
/*  1 - Quill */
import { QuillModule } from 'ngx-quill';
/*  /1 - Quill  */

@Component({
  selector: 'app-create-especialidad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* CKEditorModule, */
    /*  2 - Quill */
    QuillModule,
    /*  2 - Quill */
  ],
  templateUrl: './create-especialidad.component.html',
  styleUrl: './create-especialidad.component.css',
})
export class CreateEspecialidadComponent {
  listCategories: any = [];
  files_date: any;
  files_date_pdf: any;
  submitted = false;
  data: any;
  form: FormGroup = new FormGroup({});
  urlRaiz = environment.urlRaiz + '/';
  categoriaProductoId: any = 2;
  /* public Editor = ClassicEditor; */
  post = new Producto();
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();
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

  createForm() {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      resumen: [null, Validators.required],
      descripcion: [null, Validators.required],
      /* duracion: [null, Validators.required], */
      image: [null, Validators.required],
      /* pdf: [null, Validators.required], */
      /* maestro: [null, Validators.required], */
      /* observacion: [null, Validators.required], */
      /* precio: [null, Validators.required], */
      destacado: [false],
      /* categoria_producto_id: [null, Validators.required], */
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
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    formData.append('resumen', this.form.value.resumen);
    formData.append('descripcion', this.form.value.descripcion);
    /* formData.append('duracion', this.form.value.duracion); */
    formData.append('imagen', this.files_date, this.files_date.name);
    /* formData.append('pdf', this.files_date_pdf, this.files_date_pdf.name); */
    /* formData.append('maestro', this.form.value.maestro); */
    /* formData.append('observacion', this.form.value.observacion); */
    /* formData.append('precio', this.form.value.precio); */
    formData.append('destacado', this.form.value.destacado);
    formData.append('categoria_producto_id', this.categoriaProductoId);
    this.dataService.uploadData(formData).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.alerta();
    });
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro creado',
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

  alertaDelete() {
    Swal.fire({
      icon: 'success',
      title: 'Registro eliminado',
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
