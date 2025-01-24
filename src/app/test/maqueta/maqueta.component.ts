import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PermissionDirective } from 'src/app/directives/permission.directive';

@Component({
  selector: 'app-maqueta',
  standalone: true,
  imports: [CommonModule, PermissionDirective],
  templateUrl: './maqueta.component.html',
  styleUrls: ['./maqueta.component.css'],
})
export class MaquetaComponent {}
