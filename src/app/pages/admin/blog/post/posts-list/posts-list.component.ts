import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { Router, RouterLink } from '@angular/router'; // Importar Router para la navegación
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  dominio = environment.dominio;
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  editPost(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate([`/admin/blog/posts/edit/${id}`]);
    } else {
      console.error('El ID del post es undefined');
    }
  }

  deletePost(id: number | undefined): void {
    if (id !== undefined) {
      const confirmDelete = confirm(
        '¿Estás seguro de que deseas eliminar este post?'
      );
      if (confirmDelete) {
        this.postService.deletePost(id).subscribe(() => {
          this.posts = this.posts.filter((post) => post.id !== id);
          console.log(`Post con ID ${id} eliminado.`);
        });
      }
    } else {
      console.error('El ID del post es undefined');
    }
  }
}
