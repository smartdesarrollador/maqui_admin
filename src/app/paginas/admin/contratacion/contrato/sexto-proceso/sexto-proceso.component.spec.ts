import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SextoProcesoComponent } from './sexto-proceso.component';

describe('SextoProcesoComponent', () => {
  let component: SextoProcesoComponent;
  let fixture: ComponentFixture<SextoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SextoProcesoComponent]
    });
    fixture = TestBed.createComponent(SextoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
