import { Component } from '@angular/core';
import { Jumbotron1Component } from 'src/app/layout/componentes/jumbotron-1/jumbotron-1.component';
import { CardInfoComponent } from 'src/app/layout/componentes/card-info/card-info.component';
import { Feature1Component } from 'src/app/layout/componentes/feature-1/feature-1.component';
import { Services1Component } from 'src/app/layout/componentes/services-1/services-1.component';
import { CarouselOwl2Component } from 'src/app/layout/componentes/carousel-owl-2/carousel-owl-2.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    Jumbotron1Component,
    CardInfoComponent,
    Feature1Component,
    Services1Component,
    CarouselOwl2Component,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {}
