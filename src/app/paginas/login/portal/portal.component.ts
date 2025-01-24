import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
})
export class PortalComponent {
  constructor(private router: Router) {}
}
