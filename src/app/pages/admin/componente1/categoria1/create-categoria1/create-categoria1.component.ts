import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Categoria1Service } from '../categoria1.service';
import { Categoria1 } from '../categoria1';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-categoria1',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule,
  ],
  templateUrl: './create-categoria1.component.html',
  styleUrl: './create-categoria1.component.css',
})
export class CreateCategoria1Component implements OnInit {
  categoriaForm: FormGroup;

  htmlContent: any;

  constructor(
    private fb: FormBuilder,
    private categoriaService: Categoria1Service,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      varchar1: ['', [Validators.required, Validators.maxLength(250)]],
      /* varchar2: ['', [Validators.maxLength(250)]], */
      text1: ['', [Validators.maxLength(500)]],
      boolean1: [false, [Validators.required]],
      varchar3: [null, [Validators.required]],
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

  ngOnInit(): void {}

  onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/png') &&
      file.size <= 2 * 1024 * 1024
    ) {
      this.categoriaForm.patchValue({
        varchar3: file,
      });
    } else {
      alert('Solo se permiten archivos jpg y png de hasta 2 MB');
      this.categoriaForm.patchValue({
        varchar3: null,
      });
    }
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const formData = new FormData();
      formData.append('varchar1', this.categoriaForm.get('varchar1')?.value);
      /* formData.append('varchar2', this.categoriaForm.get('varchar2')?.value); */
      formData.append('text1', this.categoriaForm.get('text1')?.value);
      formData.append(
        'boolean1',
        this.categoriaForm.get('boolean1')?.value ? '1' : '0'
      ); // Convertir booleano a string
      if (this.categoriaForm.get('varchar3')?.value) {
        formData.append('varchar3', this.categoriaForm.get('varchar3')?.value);
      }

      this.categoriaService.createCategoria(formData).subscribe({
        next: (response) => {
          /* alert('Categoría creada satisfactoriamente');
          this.categoriaForm.reset(); */
          this.alerta();
          this.router.navigate(['/admin/categoria/equipo']);
        },
        error: (err) => console.error('Error creating category', err),
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
