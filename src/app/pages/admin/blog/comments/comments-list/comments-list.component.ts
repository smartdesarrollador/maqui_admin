import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { Router, RouterLink } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css',
})
export class CommentsListComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private commentService: CommentService, private router: Router) {}

  ngOnInit(): void {
    this.commentService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  // Función para redirigir a la página de edición
  editComment(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate([`/admin/blog/comments/edit/${id}`]); // Navegar a la ruta de edición con el id del comentario
    }
  }

  // Función para eliminar un comentario
  deleteComment(id: number | undefined): void {
    if (id !== undefined) {
      const confirmDelete = confirm(
        '¿Estás seguro de que deseas eliminar este comentario?'
      );
      if (confirmDelete) {
        this.commentService.deleteComment(id).subscribe(() => {
          // Filtrar la lista de comentarios después de eliminar
          this.comments = this.comments.filter((comment) => comment.id !== id);
          console.log(`Comentario con ID ${id} eliminado.`);
        });
      }
    } else {
      console.error('El ID del comentario es undefined');
    }
  }
}
