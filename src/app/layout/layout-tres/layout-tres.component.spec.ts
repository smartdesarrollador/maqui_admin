import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTresComponent } from './layout-tres.component';

describe('LayoutTresComponent', () => {
  let component: LayoutTresComponent;
  let fixture: ComponentFixture<LayoutTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutTresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
