import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class EmpleadorGuard {
  token: any;
  userData: any;
  rol: any;

  constructor(private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    this.token = localStorage.getItem('token');

    this.userData = jwtDecode(this.token);

    this.rol = this.userData.rol;

    const urlActual = this.router.url;

    if (this.rol === 'Admin' || this.rol === 'Empleador') {
      return true;
    } else {
      if (this.token) {
        this.router.navigate(['admin/dashboard']);
        return false;
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }
  };
}
