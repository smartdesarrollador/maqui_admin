import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOwl1Component } from './carousel-owl-1.component';

describe('CarouselOwl1Component', () => {
  let component: CarouselOwl1Component;
  let fixture: ComponentFixture<CarouselOwl1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselOwl1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselOwl1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
