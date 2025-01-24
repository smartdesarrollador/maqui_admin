import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jumbotron1Component } from './jumbotron-1.component';

describe('Jumbotron1Component', () => {
  let component: Jumbotron1Component;
  let fixture: ComponentFixture<Jumbotron1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jumbotron1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Jumbotron1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
