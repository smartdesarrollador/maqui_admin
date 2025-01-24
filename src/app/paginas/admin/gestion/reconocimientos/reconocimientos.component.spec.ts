import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientosComponent } from './reconocimientos.component';

describe('ReconocimientosComponent', () => {
  let component: ReconocimientosComponent;
  let fixture: ComponentFixture<ReconocimientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReconocimientosComponent]
    });
    fixture = TestBed.createComponent(ReconocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
