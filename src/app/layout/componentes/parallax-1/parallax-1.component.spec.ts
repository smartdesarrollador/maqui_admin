import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parallax1Component } from './parallax-1.component';

describe('Parallax1Component', () => {
  let component: Parallax1Component;
  let fixture: ComponentFixture<Parallax1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parallax1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Parallax1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
