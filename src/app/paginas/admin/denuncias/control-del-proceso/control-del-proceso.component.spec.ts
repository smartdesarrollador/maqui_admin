import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDelProcesoComponent } from './control-del-proceso.component';

describe('ControlDelProcesoComponent', () => {
  let component: ControlDelProcesoComponent;
  let fixture: ComponentFixture<ControlDelProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlDelProcesoComponent]
    });
    fixture = TestBed.createComponent(ControlDelProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
