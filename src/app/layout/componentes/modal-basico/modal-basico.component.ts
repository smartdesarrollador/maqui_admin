import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-modal-basico',
  standalone: true,
  imports: [],
  templateUrl: './modal-basico.component.html',
  styleUrl: './modal-basico.component.css',
})
export class ModalBasicoComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
