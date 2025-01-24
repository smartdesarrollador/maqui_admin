import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoUnoComponent } from './proceso-uno.component';

describe('ProcesoUnoComponent', () => {
  let component: ProcesoUnoComponent;
  let fixture: ComponentFixture<ProcesoUnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesoUnoComponent]
    });
    fixture = TestBed.createComponent(ProcesoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
