import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpolacionComponent } from './interpolacion.component';

describe('InterpolacionComponent', () => {
  let component: InterpolacionComponent;
  let fixture: ComponentFixture<InterpolacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterpolacionComponent]
    });
    fixture = TestBed.createComponent(InterpolacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
