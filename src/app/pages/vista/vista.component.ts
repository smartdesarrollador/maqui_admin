import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';

import { NavbarBasicoComponent } from 'src/app/layout/componentes/navbar-basico/navbar-basico.component';
import { DropdownBasicoComponent } from 'src/app/layout/componentes/dropdown-basico/dropdown-basico.component';
import { ModalBasicoComponent } from 'src/app/layout/componentes/modal-basico/modal-basico.component';
import { NavbarDropdownComponent } from 'src/app/layout/componentes/navbar-dropdown/navbar-dropdown.component';
import { CarouselComponent } from 'src/app/layout/componentes/carousel/carousel.component';
import { Card1Component } from 'src/app/layout/componentes/card-1/card-1.component';
import { Footer1Component } from 'src/app/layout/componentes/footer-1/footer-1.component';
import { PostCardComponent } from 'src/app/layout/componentes/post-card/post-card.component';
import { Post1Component } from 'src/app/layout/componentes/post-1/post-1.component';
import { Post2Component } from 'src/app/layout/componentes/post-2/post-2.component';
import { PostGridComponent } from 'src/app/layout/componentes/post-grid/post-grid.component';
import { Galeria1Component } from 'src/app/layout/componentes/galeria-1/galeria-1.component';
import { Header1Component } from 'src/app/layout/componentes/header-1/header-1.component';
import { Jumbotron1Component } from 'src/app/layout/componentes/jumbotron-1/jumbotron-1.component';
import { Subscribe1Component } from 'src/app/layout/componentes/subscribe-1/subscribe-1.component';
import { CarouselOwl1Component } from 'src/app/layout/componentes/carousel-owl-1/carousel-owl-1.component';

@Component({
  selector: 'app-vista',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarBasicoComponent,
    DropdownBasicoComponent,
    ModalBasicoComponent,
    NavbarDropdownComponent,
    CarouselComponent,
    Card1Component,
    Footer1Component,
    PostCardComponent,
    Post1Component,
    Post2Component,
    PostGridComponent,
    Galeria1Component,
    Header1Component,
    Jumbotron1Component,
    Subscribe1Component,
    CarouselOwl1Component,
  ],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css',
})
export class VistaComponent implements OnInit {
  ngOnInit(): void {}
}
