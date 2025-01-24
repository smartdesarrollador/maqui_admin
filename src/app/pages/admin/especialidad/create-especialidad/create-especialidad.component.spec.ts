import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEspecialidadComponent } from './create-especialidad.component';

describe('CreateEspecialidadComponent', () => {
  let component: CreateEspecialidadComponent;
  let fixture: ComponentFixture<CreateEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
