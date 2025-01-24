import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOwl2Component } from './carousel-owl-2.component';

describe('CarouselOwl2Component', () => {
  let component: CarouselOwl2Component;
  let fixture: ComponentFixture<CarouselOwl2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselOwl2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselOwl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
