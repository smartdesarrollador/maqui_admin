import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTabla1Component } from './list-tabla1.component';

describe('ListTabla1Component', () => {
  let component: ListTabla1Component;
  let fixture: ComponentFixture<ListTabla1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTabla1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTabla1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
