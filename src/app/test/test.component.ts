import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { TestNavbarComponent } from './shared/components/test-navbar/test-navbar.component';
import { TestMenuLateralComponent } from './shared/components/test-menu-lateral/test-menu-lateral.component';
import { NavbarBasicoComponent } from './shared/navbar-basico/navbar-basico.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TestNavbarComponent,
    TestMenuLateralComponent,
    NavbarBasicoComponent,
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {}
