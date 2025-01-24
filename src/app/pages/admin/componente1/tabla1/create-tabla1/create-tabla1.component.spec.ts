import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTabla1Component } from './create-tabla1.component';

describe('CreateTabla1Component', () => {
  let component: CreateTabla1Component;
  let fixture: ComponentFixture<CreateTabla1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTabla1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTabla1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
