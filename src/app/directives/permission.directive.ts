import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { jwtDecode } from 'jwt-decode';

@Directive({
  selector: '[appPermission]',
  standalone: true,
})
export class PermissionDirective implements OnInit {
  token: any;
  userData: any;
  rol: any;
  @Input() set appPermission(permissions: string[]) {
    this.updateView(permissions);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    /* const currentUserRole = 'Trabajador'; 
    const requiredPermission = 'Leer';

    if (
      this.permissionService.hasPermission(currentUserRole, requiredPermission)
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    } */
    console.log(this.rol);
  }

  private updateView(permissions: string[]) {
    this.token = localStorage.getItem('token');

    this.userData = jwtDecode(this.token);

    this.rol = this.userData.rol;

    if (permissions && permissions.length > 0) {
      // Aquí puedes manejar lógica adicional para múltiples permisos si es necesario
      // Por ejemplo, puedes verificar si el usuario tiene al menos uno de los permisos proporcionados
      const currentUserRole = this.rol; // Reemplaza esto con la obtención real del rol del usuario
      const hasAnyPermission = permissions.some((permission) =>
        this.permissionService.hasPermission(currentUserRole, permission)
      );

      if (hasAnyPermission) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else {
      /* // Si no se proporcionan permisos específicos, simplemente verifica uno predeterminado
      const requiredPermission = 'Leer';

      const currentUserRole = 'Trabajador'; // Reemplaza esto con la obtención real del rol del usuario
      if (
        this.permissionService.hasPermission(
          currentUserRole,
          requiredPermission
        )
      ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      } */
    }
  }
}
