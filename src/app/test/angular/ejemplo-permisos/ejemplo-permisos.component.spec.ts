import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploPermisosComponent } from './ejemplo-permisos.component';

describe('EjemploPermisosComponent', () => {
  let component: EjemploPermisosComponent;
  let fixture: ComponentFixture<EjemploPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjemploPermisosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EjemploPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
