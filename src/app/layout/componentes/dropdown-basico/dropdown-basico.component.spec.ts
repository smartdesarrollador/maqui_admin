import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBasicoComponent } from './dropdown-basico.component';

describe('DropdownBasicoComponent', () => {
  let component: DropdownBasicoComponent;
  let fixture: ComponentFixture<DropdownBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownBasicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
