import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoria1Component } from './list-categoria1.component';

describe('ListCategoria1Component', () => {
  let component: ListCategoria1Component;
  let fixture: ComponentFixture<ListCategoria1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategoria1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCategoria1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
