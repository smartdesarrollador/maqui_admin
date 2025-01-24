import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDeDenunciaComponent } from './consulta-de-denuncia.component';

describe('ConsultaDeDenunciaComponent', () => {
  let component: ConsultaDeDenunciaComponent;
  let fixture: ComponentFixture<ConsultaDeDenunciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaDeDenunciaComponent]
    });
    fixture = TestBed.createComponent(ConsultaDeDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
