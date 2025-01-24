import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service'; // Importar el servicio de posts
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post.model'; // Importar el modelo de Post
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent implements OnInit {
  commentForm: FormGroup;
  posts: Post[] = []; // Arreglo para los posts

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private postService: PostService, // Servicio para obtener posts
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      id_articulo: [null, Validators.required], // Aquí se seleccionará el post
      nombre_comentarista: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      contenido: ['', [Validators.required]],
      fecha_comentario: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ], // Fecha actual como valor por defecto
    });
  }

  ngOnInit(): void {
    // Cargar los posts al inicializar el componente
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  createComment(): void {
    if (this.commentForm.valid) {
      const newComment = this.commentForm.value;

      this.commentService.createComment(newComment).subscribe(
        () => {
          console.log('El comentario se ha creado correctamente.');
          this.router.navigate(['/admin/blog/comments']);
          this.alerta();
        },
        (error) => {
          console.error('Hubo un error al crear el comentario:', error);
        }
      );
    } else {
      console.error('El formulario no es válido.');
    }
  }
  alerta() {
    Swal.fire({
      icon: 'success',
      title: 'Registro creado',
    });
  }
}
