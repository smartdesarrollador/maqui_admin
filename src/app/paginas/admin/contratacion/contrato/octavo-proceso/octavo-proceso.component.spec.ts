import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavoProcesoComponent } from './octavo-proceso.component';

describe('OctavoProcesoComponent', () => {
  let component: OctavoProcesoComponent;
  let fixture: ComponentFixture<OctavoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OctavoProcesoComponent]
    });
    fixture = TestBed.createComponent(OctavoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
