import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimoProcesoComponent } from './decimo-proceso.component';

describe('DecimoProcesoComponent', () => {
  let component: DecimoProcesoComponent;
  let fixture: ComponentFixture<DecimoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecimoProcesoComponent]
    });
    fixture = TestBed.createComponent(DecimoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
