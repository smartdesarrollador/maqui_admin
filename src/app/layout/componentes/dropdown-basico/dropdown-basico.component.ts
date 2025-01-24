import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-dropdown-basico',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-basico.component.html',
  styleUrl: './dropdown-basico.component.css',
})
export class DropdownBasicoComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
