import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuintoProcesoDComponent } from './quinto-proceso-d.component';

describe('QuintoProcesoDComponent', () => {
  let component: QuintoProcesoDComponent;
  let fixture: ComponentFixture<QuintoProcesoDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuintoProcesoDComponent]
    });
    fixture = TestBed.createComponent(QuintoProcesoDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
