import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavoProcesoAComponent } from './octavo-proceso-a.component';

describe('OctavoProcesoAComponent', () => {
  let component: OctavoProcesoAComponent;
  let fixture: ComponentFixture<OctavoProcesoAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OctavoProcesoAComponent]
    });
    fixture = TestBed.createComponent(OctavoProcesoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
