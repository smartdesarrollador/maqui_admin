import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private requestService: RequestService) {}

  getAllPosts() {
    this.requestService.getPosts().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
