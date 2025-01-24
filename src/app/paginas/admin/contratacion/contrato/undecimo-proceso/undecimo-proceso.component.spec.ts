import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndecimoProcesoComponent } from './undecimo-proceso.component';

describe('UndecimoProcesoComponent', () => {
  let component: UndecimoProcesoComponent;
  let fixture: ComponentFixture<UndecimoProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UndecimoProcesoComponent]
    });
    fixture = TestBed.createComponent(UndecimoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
