import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SextoProcesoEComponent } from './sexto-proceso-e.component';

describe('SextoProcesoEComponent', () => {
  let component: SextoProcesoEComponent;
  let fixture: ComponentFixture<SextoProcesoEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SextoProcesoEComponent]
    });
    fixture = TestBed.createComponent(SextoProcesoEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
