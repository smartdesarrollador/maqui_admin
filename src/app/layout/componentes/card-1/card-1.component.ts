import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-card-1',
  standalone: true,
  imports: [],
  templateUrl: './card-1.component.html',
  styleUrl: './card-1.component.css',
})
export class Card1Component implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
