import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexboxBasicoComponent } from './flexbox-basico.component';

describe('FlexboxBasicoComponent', () => {
  let component: FlexboxBasicoComponent;
  let fixture: ComponentFixture<FlexboxBasicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlexboxBasicoComponent]
    });
    fixture = TestBed.createComponent(FlexboxBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
