import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuodecimoProcesoComponent } from './duodecimo-proceso.component';

describe('DuodecimoProcesoComponent', () => {
  let component: DuodecimoProcesoComponent;
  let fixture: ComponentFixture<DuodecimoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuodecimoProcesoComponent]
    });
    fixture = TestBed.createComponent(DuodecimoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
