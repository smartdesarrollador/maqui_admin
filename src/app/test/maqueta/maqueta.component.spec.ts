import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquetaComponent } from './maqueta.component';

describe('MaquetaComponent', () => {
  let component: MaquetaComponent;
  let fixture: ComponentFixture<MaquetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquetaComponent]
    });
    fixture = TestBed.createComponent(MaquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
