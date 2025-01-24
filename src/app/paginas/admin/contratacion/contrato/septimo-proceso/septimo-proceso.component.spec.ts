import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeptimoProcesoComponent } from './septimo-proceso.component';

describe('SeptimoProcesoComponent', () => {
  let component: SeptimoProcesoComponent;
  let fixture: ComponentFixture<SeptimoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeptimoProcesoComponent]
    });
    fixture = TestBed.createComponent(SeptimoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
