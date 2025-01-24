import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovenoProcesoComponent } from './noveno-proceso.component';

describe('NovenoProcesoComponent', () => {
  let component: NovenoProcesoComponent;
  let fixture: ComponentFixture<NovenoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovenoProcesoComponent]
    });
    fixture = TestBed.createComponent(NovenoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
