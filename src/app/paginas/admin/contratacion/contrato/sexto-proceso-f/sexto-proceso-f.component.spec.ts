import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SextoProcesoFComponent } from './sexto-proceso-f.component';

describe('SextoProcesoFComponent', () => {
  let component: SextoProcesoFComponent;
  let fixture: ComponentFixture<SextoProcesoFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SextoProcesoFComponent]
    });
    fixture = TestBed.createComponent(SextoProcesoFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
