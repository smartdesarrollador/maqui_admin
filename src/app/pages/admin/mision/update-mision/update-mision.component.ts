import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MisionService } from 'src/app/services/mision.service';
import { Mision } from 'src/app/models/mision';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-mision',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './update-mision.component.html',
  styleUrl: './update-mision.component.css',
})
export class UpdateMisionComponent {
  id_mision: number = 1;
  constructor(public categoryService: MisionService, private router: Router) {}

  ngOnInit(): void {}

  submitForm(categoryForm: NgForm) {
    this.categoryService
      .updateCategory(this.id_mision, categoryForm.value)
      .subscribe((response) => {
        this.router.navigate(['/admin/mision']);
        console.log(categoryForm.value);
      });
  }
}
