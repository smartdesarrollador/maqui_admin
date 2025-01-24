import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuartoProcesoComponent } from './cuarto-proceso.component';

describe('CuartoProcesoComponent', () => {
  let component: CuartoProcesoComponent;
  let fixture: ComponentFixture<CuartoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuartoProcesoComponent]
    });
    fixture = TestBed.createComponent(CuartoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
