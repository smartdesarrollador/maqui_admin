import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SextoProcesoBComponent } from './sexto-proceso-b.component';

describe('SextoProcesoBComponent', () => {
  let component: SextoProcesoBComponent;
  let fixture: ComponentFixture<SextoProcesoBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SextoProcesoBComponent]
    });
    fixture = TestBed.createComponent(SextoProcesoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
