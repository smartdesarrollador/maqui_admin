import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-toast-1',
  standalone: true,
  imports: [],
  templateUrl: './toast-1.component.html',
  styleUrl: './toast-1.component.css',
})
export class Toast1Component implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
