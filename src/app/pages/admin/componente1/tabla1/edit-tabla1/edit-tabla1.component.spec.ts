import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTabla1Component } from './edit-tabla1.component';

describe('EditTabla1Component', () => {
  let component: EditTabla1Component;
  let fixture: ComponentFixture<EditTabla1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTabla1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTabla1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
