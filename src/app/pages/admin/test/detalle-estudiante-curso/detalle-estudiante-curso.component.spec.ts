import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEstudianteCursoComponent } from './detalle-estudiante-curso.component';

describe('DetalleEstudianteCursoComponent', () => {
  let component: DetalleEstudianteCursoComponent;
  let fixture: ComponentFixture<DetalleEstudianteCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEstudianteCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleEstudianteCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
