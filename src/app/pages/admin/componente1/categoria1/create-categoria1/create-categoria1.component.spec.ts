import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoria1Component } from './create-categoria1.component';

describe('CreateCategoria1Component', () => {
  let component: CreateCategoria1Component;
  let fixture: ComponentFixture<CreateCategoria1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoria1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCategoria1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
