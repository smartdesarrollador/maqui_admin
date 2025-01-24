import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-binding',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './class-binding.component.html',
  styleUrls: ['./class-binding.component.css'],
})
export class ClassBindingComponent {
  text_color: string = 'text-success';

  borde_rounded: boolean = false;
}
