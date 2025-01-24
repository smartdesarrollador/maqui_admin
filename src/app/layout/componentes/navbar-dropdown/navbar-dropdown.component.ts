import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-dropdown.component.html',
  styleUrl: './navbar-dropdown.component.css',
})
export class NavbarDropdownComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
