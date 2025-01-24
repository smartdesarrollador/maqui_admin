import { Component, OnInit } from '@angular/core';
import { MostrarsiDirective } from '../directivas/mostrarsi.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-implementacion-directiva',
  standalone: true,
  imports: [CommonModule,MostrarsiDirective],
  templateUrl: './implementacion-directiva.component.html',
  styleUrl: './implementacion-directiva.component.css'
})
export class ImplementacionDirectivaComponent implements OnInit{
canRead = true;

list = [1,2,3,4,5];

videos = [
  {id:1,name:'clean Code Javascript'},
  {id:2,name:'Clean Code Angular'},
  {id:3,name:'RxJs y Observables en Angular'},
]

ngOnInit(): void {
  
}

toggleRead(){
  this.canRead = !this.canRead;
}
}
