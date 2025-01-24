import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDenunciaComponent } from './registro-denuncia.component';

describe('RegistroDenunciaComponent', () => {
  let component: RegistroDenunciaComponent;
  let fixture: ComponentFixture<RegistroDenunciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroDenunciaComponent]
    });
    fixture = TestBed.createComponent(RegistroDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
