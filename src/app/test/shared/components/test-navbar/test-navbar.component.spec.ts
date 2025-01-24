import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNavbarComponent } from './test-navbar.component';

describe('TestNavbarComponent', () => {
  let component: TestNavbarComponent;
  let fixture: ComponentFixture<TestNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNavbarComponent]
    });
    fixture = TestBed.createComponent(TestNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
