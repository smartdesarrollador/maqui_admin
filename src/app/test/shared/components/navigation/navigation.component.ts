import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  mostrarSubmenu = false;
  mostrarMobileMenu = false;

  toggleSubmenu() {
    this.mostrarSubmenu = !this.mostrarSubmenu;
  }

  toggleMobileMenu() {
    this.mostrarMobileMenu = !this.mostrarMobileMenu;
  }
}
