import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescansosComponent } from './descansos.component';

describe('DescansosComponent', () => {
  let component: DescansosComponent;
  let fixture: ComponentFixture<DescansosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescansosComponent]
    });
    fixture = TestBed.createComponent(DescansosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
