import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-basico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-basico.component.html',
  styleUrl: './navbar-basico.component.css',
})
export class NavbarBasicoComponent {
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
}
