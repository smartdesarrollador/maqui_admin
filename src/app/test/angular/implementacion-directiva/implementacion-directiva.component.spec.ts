import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementacionDirectivaComponent } from './implementacion-directiva.component';

describe('ImplementacionDirectivaComponent', () => {
  let component: ImplementacionDirectivaComponent;
  let fixture: ComponentFixture<ImplementacionDirectivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImplementacionDirectivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImplementacionDirectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
