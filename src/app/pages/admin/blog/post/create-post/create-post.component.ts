import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  categorias: Category[] = [];
  autores = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Autor' },
  ];
  selectedFile: File | null = null; // Almacenar el archivo seleccionado

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
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      contenido: ['', [Validators.required]],
      id_autor: [null, Validators.required],
      estado: ['publicado', Validators.required],
      fecha_publicacion: ['', Validators.required],
      categorias: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categorias = data;
    });
  }

  onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  // Método para manejar el archivo seleccionado
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  createPost(): void {
    if (this.postForm.valid && this.selectedFile) {
      const formData = new FormData();

      // Añadir los campos del formulario al FormData
      formData.append('titulo', this.postForm.get('titulo')!.value);
      formData.append('contenido', this.postForm.get('contenido')!.value);
      formData.append('id_autor', this.postForm.get('id_autor')!.value);
      formData.append('estado', this.postForm.get('estado')!.value);
      formData.append(
        'fecha_publicacion',
        this.postForm.get('fecha_publicacion')!.value
      );
      this.postForm.get('categorias')!.value.forEach((categoriaId: number) => {
        formData.append('categorias[]', categoriaId.toString()); // Convertir a string
      });

      // Añadir el archivo de imagen
      formData.append('imagen', this.selectedFile);

      // Llamar al servicio para crear el post
      this.postService.createPost(formData).subscribe(
        () => {
          console.log('El post se ha creado correctamente.');
          this.router.navigate(['/admin/blog/posts']);
          this.alerta();
        },
        (error) => {
          console.error('Hubo un error al crear el post:', error);
        }
      );
    } else {
      console.error(
        'El formulario no es válido o no se ha seleccionado una imagen.'
      );
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro creado',
    });
  }
}
