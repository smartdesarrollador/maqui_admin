import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBasicoComponent } from './navbar-basico.component';

describe('NavbarBasicoComponent', () => {
  let component: NavbarBasicoComponent;
  let fixture: ComponentFixture<NavbarBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBasicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
