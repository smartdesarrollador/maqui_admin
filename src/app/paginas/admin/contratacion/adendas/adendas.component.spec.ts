import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdendasComponent } from './adendas.component';

describe('AdendasComponent', () => {
  let component: AdendasComponent;
  let fixture: ComponentFixture<AdendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdendasComponent]
    });
    fixture = TestBed.createComponent(AdendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
