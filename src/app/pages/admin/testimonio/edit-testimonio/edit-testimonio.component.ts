import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Testimonio } from 'src/app/models/testimonio.model';
import { TestimonioService } from 'src/app/services/testimonio.service';
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
  selector: 'app-edit-testimonio',
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
  templateUrl: './edit-testimonio.component.html',
  styleUrl: './edit-testimonio.component.css',
})
export class EditTestimonioComponent {
  listCategories: any = [];
  files_date: any;
  submitted = false;
  data: any;
  form: FormGroup = new FormGroup({});
  urlRaiz = environment.urlRaiz + '/';
  valor_id_testimonio: any;
  categoriaTestimonioId: any = 1;
  /* public Editor = ClassicEditor; */

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

  post = new Testimonio();
  constructor(
    private formBuilder: FormBuilder,
    private dataService: TestimonioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();

    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      this.valor_id_testimonio = categoryId;
    });
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
      titulo: [this.dataService.selectCategory.titulo, Validators.required],
      descripcion: [
        this.dataService.selectCategory.descripcion,
        Validators.required,
      ],
      image: [null],
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

  onSubmit() {
    this.submitted = true;
    /*  if (this.form.invalid) {
      return;
    } */

    const formData = new FormData();
    formData.append('id_testimonio', this.valor_id_testimonio);
    formData.append('titulo', this.form.value.titulo);
    formData.append('descripcion', this.form.value.descripcion);

    if (this.files_date) {
      formData.append('imagen', this.files_date, this.files_date.name);
    }

    this.dataService.updateData(formData).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.alerta();
      this.router.navigate(['/admin/testimonios']);
    });
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Imagen subida',
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
}
