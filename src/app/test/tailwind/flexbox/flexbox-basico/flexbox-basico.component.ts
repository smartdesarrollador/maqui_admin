import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flexbox-basico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flexbox-basico.component.html',
  styleUrls: ['./flexbox-basico.component.css'],
})
export class FlexboxBasicoComponent {}
