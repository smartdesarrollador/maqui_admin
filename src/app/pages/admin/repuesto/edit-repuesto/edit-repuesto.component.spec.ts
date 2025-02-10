import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepuestoComponent } from './edit-repuesto.component';

describe('EditRepuestoComponent', () => {
  let component: EditRepuestoComponent;
  let fixture: ComponentFixture<EditRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
