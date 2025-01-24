import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMenuLateralComponent } from './test-menu-lateral.component';

describe('TestMenuLateralComponent', () => {
  let component: TestMenuLateralComponent;
  let fixture: ComponentFixture<TestMenuLateralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestMenuLateralComponent]
    });
    fixture = TestBed.createComponent(TestMenuLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
