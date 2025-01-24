import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReactivoComponent } from './formulario-reactivo.component';

describe('FormularioReactivoComponent', () => {
  let component: FormularioReactivoComponent;
  let fixture: ComponentFixture<FormularioReactivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioReactivoComponent]
    });
    fixture = TestBed.createComponent(FormularioReactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
