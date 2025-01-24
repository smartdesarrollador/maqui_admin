import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PermissionDirective } from 'src/app/directives/permission.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PermissionDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
