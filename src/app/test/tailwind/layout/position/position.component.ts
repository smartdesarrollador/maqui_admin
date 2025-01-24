import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent {}
