import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Carousel } from 'src/app/models/carousel.model';
import { CarouselService } from 'src/app/services/carousel.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-owl-2',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './carousel-owl-2.component.html',
  styleUrl: './carousel-owl-2.component.css',
})
export class CarouselOwl2Component implements OnInit {
  urlRaiz = environment.urlRaiz + '/';
  listBanners: any = [];
  constructor(private dataService: CarouselService) {}

  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners() {
    return this.dataService.getCategories().subscribe((data: {}) => {
      console.log(data);
      this.listBanners = data;
    });
  }

  customOptions: OwlOptions = {
    /* animateIn: 'animate__animated animate__fadeIn',
    animateOut: 'animate__animated animate__zoomOut', */
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 0,

    autoplay: true,

    autoplayTimeout: 4000,

    navText: ['<', '>'],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
}
