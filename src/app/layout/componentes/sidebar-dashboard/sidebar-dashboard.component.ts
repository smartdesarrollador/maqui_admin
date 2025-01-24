import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css',
})
export class SidebarDashboardComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
