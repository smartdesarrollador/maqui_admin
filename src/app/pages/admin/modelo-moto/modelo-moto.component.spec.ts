import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloMotoComponent } from './modelo-moto.component';

describe('ModeloMotoComponent', () => {
  let component: ModeloMotoComponent;
  let fixture: ComponentFixture<ModeloMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeloMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeloMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
