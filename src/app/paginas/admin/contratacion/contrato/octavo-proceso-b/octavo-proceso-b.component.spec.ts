import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavoProcesoBComponent } from './octavo-proceso-b.component';

describe('OctavoProcesoBComponent', () => {
  let component: OctavoProcesoBComponent;
  let fixture: ComponentFixture<OctavoProcesoBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OctavoProcesoBComponent]
    });
    fixture = TestBed.createComponent(OctavoProcesoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
