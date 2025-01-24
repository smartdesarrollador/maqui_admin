import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tabla1Service } from '../tabla1.service';
import { Categoria1Service } from '../../categoria1/categoria1.service';
import { Tabla1 } from '../tabla1';
import { Categoria1 } from '../../categoria1/categoria1';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { QuillModule } from 'ngx-quill';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-tabla1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    QuillModule,
  ],
  templateUrl: './edit-tabla1.component.html',
  styleUrl: './edit-tabla1.component.css',
})
export class EditTabla1Component implements OnInit {
  dominio = environment.dominio;
  tablaForm: FormGroup;
  id: number;
  currentImage: string | null = null;
  categorias: Categoria1[] = [];

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
    private fb: FormBuilder,
    private tabla1Service: Tabla1Service,
    private categoria1Service: Categoria1Service,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.tablaForm = this.fb.group({
      varchar1: ['', [Validators.required, Validators.maxLength(250)]],
      varchar2: ['', [Validators.required, Validators.maxLength(250)]],
      /* varchar3: ['', [Validators.required, Validators.maxLength(250)]], */
      text1: [''],
      boolean1: [false, [Validators.required]],
      varchar7: [null],
      categoria1_id: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getTabla1();
  }

  onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  getCategorias(): void {
    this.categoria1Service.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error fetching categories', err),
    });
  }

  getTabla1(): void {
    this.tabla1Service.getTabla(this.id).subscribe({
      next: (tabla) => {
        this.tablaForm.patchValue({
          varchar1: tabla.varchar1,
          varchar2: tabla.varchar2,
          varchar3: tabla.varchar3,
          text1: tabla.text1,
          boolean1: tabla.boolean1,
          categoria1_id: tabla.categoria1_id,
        });
        this.currentImage = tabla.varchar7 ? tabla.varchar7 : null;
      },
      error: (err) => console.error('Error loading record', err),
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/png') &&
      file.size <= 2 * 1024 * 1024
    ) {
      this.tablaForm.patchValue({
        varchar7: file,
      });
    } else {
      alert('Solo se permiten archivos jpg y png de hasta 2 MB');
      this.tablaForm.patchValue({
        varchar7: null,
      });
    }
  }

  onSubmit(): void {
    if (this.tablaForm.valid) {
      const formData = new FormData();
      formData.append('varchar1', this.tablaForm.get('varchar1')?.value);
      formData.append('varchar2', this.tablaForm.get('varchar2')?.value);
      /* formData.append('varchar3', this.tablaForm.get('varchar3')?.value); */
      formData.append('text1', this.tablaForm.get('text1')?.value);
      formData.append(
        'boolean1',
        this.tablaForm.get('boolean1')?.value ? '1' : '0'
      );
      formData.append(
        'categoria1_id',
        this.tablaForm.get('categoria1_id')?.value
      );
      if (this.tablaForm.get('varchar7')?.value) {
        formData.append('varchar7', this.tablaForm.get('varchar7')?.value);
      }

      this.tabla1Service.updateTablaWithPost(this.id, formData).subscribe({
        next: () => {
          /* alert('Registro actualizado satisfactoriamente'); */
          this.alerta();
          this.router.navigate(['/admin/equipo']);
        },
        error: (err) => console.error('Error updating record', err),
      });
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro editado',
    });
  }
}
