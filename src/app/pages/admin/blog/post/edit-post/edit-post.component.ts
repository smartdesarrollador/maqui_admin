import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post.model';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  categorias: Category[] = [];
  autores = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Autor' },
  ];
  postId: number;
  selectedImage: File | null = null; // Variable para manejar la imagen seleccionada
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      contenido: ['', [Validators.required]],
      id_autor: [null, Validators.required],
      estado: ['publicado', Validators.required],
      fecha_publicacion: ['', Validators.required],
      categorias: [[], Validators.required],
      imagen: [null], // Campo para la imagen (aunque sea opcional)
    });

    // Obtener el ID del post desde la URL
    this.postId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Cargar las categorías
    this.categoryService.getCategories().subscribe((data) => {
      this.categorias = data;
    });

    // Cargar los datos del post a editar
    this.postService.getPost(this.postId).subscribe((post: Post) => {
      this.postForm.patchValue({
        titulo: post.titulo,
        contenido: post.contenido,
        id_autor: post.id_autor,
        estado: post.estado,
        fecha_publicacion: post.fecha_publicacion,
        categorias: post.categorias?.map((categoria: Category) => categoria.id), // Asegúrate de tipar correctamente
      });
    });
  }

  onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlContent = event.html;
    }
  }

  // Función para manejar la selección de la imagen
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  updatePost(): void {
    if (this.postForm.valid) {
      const formData = new FormData();

      // Añadir los campos del formulario al FormData
      formData.append('id', this.postId.toString()); // ID del post a actualizar
      formData.append('titulo', this.postForm.get('titulo')!.value);
      formData.append('contenido', this.postForm.get('contenido')!.value);
      formData.append('id_autor', this.postForm.get('id_autor')!.value);
      formData.append('estado', this.postForm.get('estado')!.value);
      formData.append(
        'fecha_publicacion',
        this.postForm.get('fecha_publicacion')!.value
      );

      // Añadir categorías al FormData
      this.postForm.get('categorias')!.value.forEach((categoriaId: number) => {
        formData.append('categorias[]', categoriaId.toString());
      });

      // Si hay una imagen seleccionada, añadirla al FormData
      if (this.selectedImage) {
        formData.append('imagen', this.selectedImage);
      }

      // Enviar el formulario al servicio
      this.postService.updatePostWithPost(formData).subscribe(
        () => {
          console.log('Post actualizado correctamente.');
          this.router.navigate(['/admin/blog/posts']);
          this.alerta();
        },
        (error) => {
          console.error('Hubo un error al actualizar el post:', error);
        }
      );
    }
  }

  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro editado',
    });
  }
}
