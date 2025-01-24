import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PermissionDirective } from 'src/app/directives/permission.directive';

@Component({
  selector: 'app-ejemplo-permisos',
  standalone: true,
  imports: [CommonModule, PermissionDirective],
  templateUrl: './ejemplo-permisos.component.html',
  styleUrl: './ejemplo-permisos.component.css',
})
export class EjemploPermisosComponent {}
