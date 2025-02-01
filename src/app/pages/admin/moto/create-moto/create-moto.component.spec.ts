import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMotoComponent } from './create-moto.component';

describe('CreateMotoComponent', () => {
  let component: CreateMotoComponent;
  let fixture: ComponentFixture<CreateMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
