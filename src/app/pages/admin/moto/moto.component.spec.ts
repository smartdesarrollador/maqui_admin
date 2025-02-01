import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoComponent } from './moto.component';

describe('MotoComponent', () => {
  let component: MotoComponent;
  let fixture: ComponentFixture<MotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
