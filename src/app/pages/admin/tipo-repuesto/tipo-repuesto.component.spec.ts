import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRepuestoComponent } from './tipo-repuesto.component';

describe('TipoRepuestoComponent', () => {
  let component: TipoRepuestoComponent;
  let fixture: ComponentFixture<TipoRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoRepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
