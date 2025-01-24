import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sticky',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.css'],
})
export class StickyComponent {}
