import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestimonioComponent } from './create-testimonio.component';

describe('CreateTestimonioComponent', () => {
  let component: CreateTestimonioComponent;
  let fixture: ComponentFixture<CreateTestimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestimonioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTestimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
