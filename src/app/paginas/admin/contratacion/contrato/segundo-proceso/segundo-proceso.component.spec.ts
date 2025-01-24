import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoProcesoComponent } from './segundo-proceso.component';

describe('SegundoProcesoComponent', () => {
  let component: SegundoProcesoComponent;
  let fixture: ComponentFixture<SegundoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegundoProcesoComponent]
    });
    fixture = TestBed.createComponent(SegundoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
