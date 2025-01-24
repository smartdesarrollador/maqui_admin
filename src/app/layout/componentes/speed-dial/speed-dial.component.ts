import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-speed-dial',
  standalone: true,
  imports: [],
  templateUrl: './speed-dial.component.html',
  styleUrl: './speed-dial.component.css',
})
export class SpeedDialComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
