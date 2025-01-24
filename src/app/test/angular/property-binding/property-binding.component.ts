import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-binding',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css'],
})
export class PropertyBindingComponent {
  src: string =
    'https://images.pexels.com/photos/18015250/pexels-photo-18015250/free-photo-of-la-escultura-de-piedra-mas-alta-de-europa.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load';
}
