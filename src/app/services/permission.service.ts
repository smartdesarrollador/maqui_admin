import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  roles = ['Admin', 'Empleador', 'Trabajador'];
  permissions = ['Leer', 'Crear', 'Editar', 'Eliminar'];

  constructor() {}

  hasPermission(role: string, permission: string): boolean {
    // Lógica para verificar si el rol tiene el permiso
    // Puedes personalizar esto según tus necesidades
    if (role === 'Admin') {
      return true; // Admin tiene todos los permisos
    } else if (role === 'Empleador' && permission !== 'Eliminar') {
      return true; // Empleador tiene todos los permisos excepto Eliminar
    } else if (role === 'Trabajador' && permission === 'Leer') {
      return true; // Trabajador solo tiene permiso de Leer
    }

    return false;
  }
}
