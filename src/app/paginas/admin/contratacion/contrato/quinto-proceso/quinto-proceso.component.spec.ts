import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuintoProcesoComponent } from './quinto-proceso.component';

describe('QuintoProcesoComponent', () => {
  let component: QuintoProcesoComponent;
  let fixture: ComponentFixture<QuintoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuintoProcesoComponent]
    });
    fixture = TestBed.createComponent(QuintoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
