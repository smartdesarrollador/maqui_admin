import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFileCarouselComponent } from './update-file-carousel.component';

describe('UpdateFileCarouselComponent', () => {
  let component: UpdateFileCarouselComponent;
  let fixture: ComponentFixture<UpdateFileCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFileCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFileCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
