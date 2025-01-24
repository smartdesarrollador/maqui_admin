import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Tabla1Service } from '../tabla1.service';
import { Tabla1 } from '../tabla1';
import { Categoria1Service } from '../../categoria1/categoria1.service';
import { Categoria1 } from '../../categoria1/categoria1';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-tabla1',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule,
  ],
  templateUrl: './create-tabla1.component.html',
  styleUrl: './create-tabla1.component.css',
})
export class CreateTabla1Component implements OnInit {
  tablaForm: FormGroup;
  categorias: Categoria1[] = [];
  htmlContent: any;

  constructor(
    private fb: FormBuilder,
    private tabla1Service: Tabla1Service,
    private categoria1Service: Categoria1Service,
    private router: Router
  ) {
    this.tablaForm = this.fb.group({
      varchar1: ['', [Validators.required, Validators.maxLength(250)]],
      varchar2: ['', [Validators.required, Validators.maxLength(250)]],
      /*  varchar3: ['', [Validators.required, Validators.maxLength(250)]], */
      text1: [''],
      boolean1: [false, [Validators.required]],
      varchar7: [null, [Validators.required]],
      categoria1_id: [null, [Validators.required]],
    });
  }

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

  ngOnInit(): void {
    this.getCategorias();
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

      this.tabla1Service.createTabla(formData).subscribe({
        next: (response) => {
          /* alert('Registro creado satisfactoriamente'); */
          this.alerta();
          this.router.navigate(['/admin/equipo']);
        },
        error: (err) => console.error('Error creating record', err),
      });
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro creado',
    });
  }
}
