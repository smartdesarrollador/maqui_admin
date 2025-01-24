import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerProcesoComponent } from './tercer-proceso.component';

describe('TercerProcesoComponent', () => {
  let component: TercerProcesoComponent;
  let fixture: ComponentFixture<TercerProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TercerProcesoComponent]
    });
    fixture = TestBed.createComponent(TercerProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
