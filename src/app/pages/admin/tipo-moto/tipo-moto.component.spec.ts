import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMotoComponent } from './tipo-moto.component';

describe('TipoMotoComponent', () => {
  let component: TipoMotoComponent;
  let fixture: ComponentFixture<TipoMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
