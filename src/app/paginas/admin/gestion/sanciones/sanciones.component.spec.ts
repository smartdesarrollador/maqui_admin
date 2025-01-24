import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SancionesComponent } from './sanciones.component';

describe('SancionesComponent', () => {
  let component: SancionesComponent;
  let fixture: ComponentFixture<SancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SancionesComponent]
    });
    fixture = TestBed.createComponent(SancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
