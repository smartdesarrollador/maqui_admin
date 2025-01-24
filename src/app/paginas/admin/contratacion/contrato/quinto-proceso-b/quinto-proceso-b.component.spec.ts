import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuintoProcesoBComponent } from './quinto-proceso-b.component';

describe('QuintoProcesoBComponent', () => {
  let component: QuintoProcesoBComponent;
  let fixture: ComponentFixture<QuintoProcesoBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuintoProcesoBComponent]
    });
    fixture = TestBed.createComponent(QuintoProcesoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
