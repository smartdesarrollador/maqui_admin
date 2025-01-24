import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBasicoComponent } from './modal-basico.component';

describe('ModalBasicoComponent', () => {
  let component: ModalBasicoComponent;
  let fixture: ComponentFixture<ModalBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBasicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
