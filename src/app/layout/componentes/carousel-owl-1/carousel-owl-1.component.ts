import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Upload } from 'src/app/models/upload.model';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-owl-1',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './carousel-owl-1.component.html',
  styleUrl: './carousel-owl-1.component.css',
})
export class CarouselOwl1Component implements OnInit {
  urlRaiz = environment.urlRaiz + '/';
  listBanners: any = [];
  constructor(private dataService: UploadService) {}

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

    autoplayTimeout: 3000,

    navText: ['<', '>'],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
}
