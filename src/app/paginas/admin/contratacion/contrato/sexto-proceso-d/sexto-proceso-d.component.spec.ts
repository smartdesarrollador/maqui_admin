import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SextoProcesoDComponent } from './sexto-proceso-d.component';

describe('SextoProcesoDComponent', () => {
  let component: SextoProcesoDComponent;
  let fixture: ComponentFixture<SextoProcesoDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SextoProcesoDComponent]
    });
    fixture = TestBed.createComponent(SextoProcesoDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
