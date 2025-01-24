import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoria1Component } from './edit-categoria1.component';

describe('EditCategoria1Component', () => {
  let component: EditCategoria1Component;
  let fixture: ComponentFixture<EditCategoria1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoria1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCategoria1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
