import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoriasComponent } from './obligatorias.component';

describe('ObligatoriasComponent', () => {
  let component: ObligatoriasComponent;
  let fixture: ComponentFixture<ObligatoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObligatoriasComponent]
    });
    fixture = TestBed.createComponent(ObligatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
