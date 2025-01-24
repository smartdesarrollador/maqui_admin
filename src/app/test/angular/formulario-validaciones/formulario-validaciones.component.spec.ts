import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioValidacionesComponent } from './formulario-validaciones.component';

describe('FormularioValidacionesComponent', () => {
  let component: FormularioValidacionesComponent;
  let fixture: ComponentFixture<FormularioValidacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioValidacionesComponent]
    });
    fixture = TestBed.createComponent(FormularioValidacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
