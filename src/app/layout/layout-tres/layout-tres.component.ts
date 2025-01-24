import { Component, OnInit } from '@angular/core';
import { Footer1Component } from '../componentes/footer-1/footer-1.component';
import { SidebarDashboardComponent } from '../componentes/sidebar-dashboard/sidebar-dashboard.component';
import { Table1Component } from '../componentes/table-1/table-1.component';
import { Toast1Component } from '../componentes/toast-1/toast-1.component';
import { SpeedDialComponent } from '../componentes/speed-dial/speed-dial.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout-tres',
  standalone: true,
  imports: [
    Footer1Component,
    SidebarDashboardComponent,
    Table1Component,
    Toast1Component,
    SpeedDialComponent,
  ],
  templateUrl: './layout-tres.component.html',
  styleUrl: './layout-tres.component.css',
})
export class LayoutTresComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
