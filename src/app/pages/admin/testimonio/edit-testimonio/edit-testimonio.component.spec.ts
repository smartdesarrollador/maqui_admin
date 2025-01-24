import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestimonioComponent } from './edit-testimonio.component';

describe('EditTestimonioComponent', () => {
  let component: EditTestimonioComponent;
  let fixture: ComponentFixture<EditTestimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTestimonioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTestimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
