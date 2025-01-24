import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SextoProcesoCComponent } from './sexto-proceso-c.component';

describe('SextoProcesoCComponent', () => {
  let component: SextoProcesoCComponent;
  let fixture: ComponentFixture<SextoProcesoCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SextoProcesoCComponent]
    });
    fixture = TestBed.createComponent(SextoProcesoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
