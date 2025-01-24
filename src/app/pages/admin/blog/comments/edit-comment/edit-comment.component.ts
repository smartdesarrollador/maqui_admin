import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service'; // Servicio para obtener posts
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post.model'; // Modelo Post
import { Comment } from 'src/app/models/comment.model'; // Modelo Comment
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css',
})
export class EditCommentComponent implements OnInit {
  commentForm: FormGroup;
  posts: Post[] = []; // Arreglo de posts
  commentId: number;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private postService: PostService, // Servicio para obtener posts
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      id_articulo: [null, Validators.required], // Post asociado
      nombre_comentarista: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      contenido: ['', Validators.required],
      fecha_comentario: ['', Validators.required], // Fecha
    });

    // Obtener el ID del comentario desde la URL
    this.commentId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Cargar los posts al inicializar el componente
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });

    // Cargar los datos del comentario a editar
    this.commentService
      .getComment(this.commentId)
      .subscribe((comment: Comment) => {
        this.commentForm.patchValue({
          id_articulo: comment.id_articulo,
          nombre_comentarista: comment.nombre_comentarista,
          contenido: comment.contenido,
          fecha_comentario: comment.fecha_comentario,
        });
      });
  }

  updateComment(): void {
    if (this.commentForm.valid) {
      const updatedComment = this.commentForm.value;

      this.commentService
        .updateComment(this.commentId, updatedComment)
        .subscribe(
          () => {
            console.log('Comentario actualizado correctamente.');
            this.router.navigate(['/admin/blog/comments']);
            this.alerta();
          },
          (error) => {
            console.error('Hubo un error al actualizar el comentario:', error);
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
