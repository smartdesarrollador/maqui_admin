import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Galeria1Component } from './galeria-1.component';

describe('Galeria1Component', () => {
  let component: Galeria1Component;
  let fixture: ComponentFixture<Galeria1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galeria1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Galeria1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
