import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUnoComponent } from './layout-uno.component';

describe('LayoutUnoComponent', () => {
  let component: LayoutUnoComponent;
  let fixture: ComponentFixture<LayoutUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutUnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
