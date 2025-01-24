import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Footer1Component } from 'src/app/layout/componentes/footer-1/footer-1.component';
import { SidebarDashboardComponent } from 'src/app/layout/componentes/sidebar-dashboard/sidebar-dashboard.component';
import { Table1Component } from 'src/app/layout/componentes/table-1/table-1.component';
import { Toast1Component } from 'src/app/layout/componentes/toast-1/toast-1.component';
import { SpeedDialComponent } from 'src/app/layout/componentes/speed-dial/speed-dial.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Footer1Component,
    SidebarDashboardComponent,
    Table1Component,
    Toast1Component,
    SpeedDialComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
