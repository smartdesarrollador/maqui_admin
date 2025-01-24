import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuintoProcesoCComponent } from './quinto-proceso-c.component';

describe('QuintoProcesoCComponent', () => {
  let component: QuintoProcesoCComponent;
  let fixture: ComponentFixture<QuintoProcesoCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuintoProcesoCComponent]
    });
    fixture = TestBed.createComponent(QuintoProcesoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
