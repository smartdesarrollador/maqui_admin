import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { Router, RouterLink } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.css',
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private tagService: TagService, private router: Router) {}

  ngOnInit(): void {
    this.tagService.getTags().subscribe((data) => {
      this.tags = data;
    });
  }

  // Función para redirigir a la página de edición
  editTag(id: number): void {
    this.router.navigate([`/admin/blog/tags/edit/${id}`]); // Navegar a la ruta de edición con el id del tag
  }

  // Función para eliminar un tag
  deleteTag(id: number): void {
    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar este tag?'
    );
    if (confirmDelete) {
      this.tagService.deleteTag(id).subscribe(() => {
        // Filtrar la lista de tags después de eliminar
        this.tags = this.tags.filter((tag) => tag.id !== id);
        console.log(`Tag con ID ${id} eliminado.`);
      });
    }
  }
}
