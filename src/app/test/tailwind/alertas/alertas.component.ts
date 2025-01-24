import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css'],
})
export class AlertasComponent {}
